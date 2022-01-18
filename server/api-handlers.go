package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/golang-jwt/jwt"
)

type API struct {
	repo Repo
}

func (h *API) register(w http.ResponseWriter, r *http.Request) {
	var newUser user
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
	}

	err = json.Unmarshal(reqBody, &newUser)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
	}

	fmt.Println(newUser)

	expectedPassword, ok := users[newUser.Username]
	if !ok || expectedPassword != newUser.Password {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	claims := NewClaim(newUser)

	tokenString, err := claims.NewWithClaims(jwt.SigningMethodES256)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = h.repo.CreateUser(&newUser)
	fmt.Println("CreateUser Error:", err)
	if err != nil {
		w.WriteHeader(http.StatusConflict)
		json.NewEncoder(w).Encode(fmt.Sprintf("Could not create user: %s", err.Error()))
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expires,
		SameSite: http.SameSiteStrictMode,
	})

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(newUser)
}

func (h *API) getUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.repo.GetUsers()
	if err != nil {
		json.NewEncoder(w).Encode(err)
		return
	}
	json.NewEncoder(w).Encode(users)
}

// func (h *API) getUser(w http.ResponseWriter, r *http.Request) {
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

// func (h *API) createMessage(w http.ResponseWriter, r *http.Request) {
// 	var newMessage message
// 	reqBody, err := ioutil.ReadAll(r.Body)
// 	if err != nil {
// 		fmt.Fprintf(w, "Could not read the request body")
// 	}
// 	json.Unmarshal(reqBody, &newMessage)
// 	messages = append(messages, newMessage)
// 	json.NewEncoder(w).Encode(newMessage)
// }

// func (h *API) getMessages(w http.ResponseWriter, r *http.Request) {
// 	json.NewEncoder(w).Encode(messages)
// }

// func (h *API) getMessage(w http.ResponseWriter, r *http.Request) {
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

func (h *API) registerEndpoints() {
	router.HandleFunc("/api/users", h.register).Methods("POST")
	router.HandleFunc("/api/users", h.getUsers).Methods("GET")
	// router.HandleFunc("/api/users/{id}", h.getUser).Methods("GET")

	// router.HandleFunc("/api/messages", h.createMessage).Methods("POST")
	// router.HandleFunc("/api/messages", h.getMessages).Methods("GET")
	// router.HandleFunc("/api/messages/{id}", h.getMessage).Methods("GET")
}
