package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/golang-jwt/jwt"
)

type API struct {
	repo Repository
}

func (api *API) register(w http.ResponseWriter, r *http.Request) {
	var newUser user
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(fmt.Sprintf("Could not read request: %s", err.Error()))
		return
	}

	err = json.Unmarshal(reqBody, &newUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(fmt.Sprintf("Could not unmarshal request body: %s", err.Error()))
		return
	}

	hashedPassword, err := HashPassword(newUser.Password)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(fmt.Sprintf("Could not hasapipassword: %s", err.Error()))
		return
	}
	newUser.Password = hashedPassword

	err = api.repo.CreateUser(&newUser)
	if err != nil {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(fmt.Sprintf("Could not create user: %s", err.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func (api *API) login(w http.ResponseWriter, r *http.Request) {
	var loginUser user
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	err = json.Unmarshal(reqBody, &loginUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}

	var dbUser user
	err = api.repo.GetUserByUsername(&dbUser, loginUser.Username)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		return
	}

	if !CheckPasswordHash(dbUser.Password, loginUser.Password) {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	claims := NewClaims(loginUser)

	tokenString, err := claims.NewWithClaims(jwt.SigningMethodHS256)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expires,
		SameSite: http.SameSiteStrictMode,
	})

	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(loginUser)
}

func (api *API) getUsers(w http.ResponseWriter, r *http.Request) {
	users, err := api.repo.GetUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(users)
}

// func (api *API) getUser(w http.ResponseWriter, r *http.Request) {
// 	var user user
// 	vars := mux.Vars(r)
// 	id, err := strconv.Atoi(vars["id"])
// 	if err != nil {
// 		json.NewEncoder(w).Encode(fmt.Sprintf("Invalid ID: %v", vars["id"]))
// 		return
// 	}
// 		for _, usr := range users {
// 			if id > 0 && usr.Id == id {
// 				user = usr
// 				json.NewEncoder(w).Encode(user)
// 				return
// 			}
// 		}
// 		json.NewEncoder(w).Encode(fmt.Sprintf("User %v not found", id))
// }

// func (api *API) createMessage(w http.ResponseWriter, r *http.Request) {
// 	var newMessage message
// 	reqBody, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		fmt.Fprintf(w, "Could not read the request body")
// 	}
// 	json.Unmarshal(reqBody, &newMessage)
// 	messages = append(messages, newMessage)
// 	json.NewEncoder(w).Encode(newMessage)
// }

// func (api *API) getMessages(w http.ResponseWriter, r *http.Request) {
// 	json.NewEncoder(w).Encode(messages)
// }

// func (api *API) getMessage(w http.ResponseWriter, r *http.Request) {
// 	var message message
// 	vars := mux.Vars(r)
// 	id, err := strconv.Atoi(vars["id"])
// 	if err != nil {
// 		json.NewEncoder(w).Encode(fmt.Sprintf("Invalid ID: %v", vars["id"]))
// 		return
// 	}
// 	for _, msg := range messages {
// 		if msg.Id == id {
// 			message = msg
// 			json.NewEncoder(w).Encode(message)
// 			return
// 		}
// 	}
// 		json.NewEncoder(w).Encode(fmt.Sprintf("Message %v not found", id))
// }

func (api *API) registerEndpoints() {
	router.HandleFunc("/api/users/register", api.register).Methods("POST")
	router.HandleFunc("/api/users/login", api.login).Methods("POST")
	router.HandleFunc("/api/users", IsAuthorized(api.getUsers)).Methods("GET")
	// router.HandleFunc("/api/users/{id}", api.getUser).Methods("GET")

	// router.HandleFunc("/api/messages", api.createMessage).Methods("POST")
	// router.HandleFunc("/api/messages", api.getMessages).Methods("GET")
	// router.HandleFunc("/api/messages/{id}", api.getMessage).Methods("GET")
}
