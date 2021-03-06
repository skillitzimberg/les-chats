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

func (api *API) ping(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("King Pong")
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
		fmt.Println("Passwords don't match")
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
		Expires:  claims.Expiration,
		SameSite: http.SameSiteStrictMode,
		HttpOnly: true,
	})

	userJSON, err := dbUser.MarshalJSON()
	fmt.Println(string(userJSON))
	if err != nil {
		fmt.Println("Could not marshal user to JSON")
	}
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(struct {
		LoginUser  string `json:"loginUser"`
		Expiration int64  `json:"expiresAt"`
	}{
		LoginUser:  string(userJSON),
		Expiration: claims.ExpiresAt,
	})
}

func (api *API) getUsers(w http.ResponseWriter, r *http.Request) {
	users, err := api.repo.GetUsers()
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(err)
		return
	}

	json.NewEncoder(w).Encode(users)
}

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

func (api *API) registerEndpoints() {
	router.HandleFunc("/api/users/ping", api.ping).Methods("POST")
	router.HandleFunc("/api/users/register", api.register).Methods("POST")
	router.HandleFunc("/api/users/login", api.login).Methods("POST")
	router.HandleFunc("/api/users", IsAuthorized(api.getUsers)).Methods("GET")

	// router.HandleFunc("/api/messages", api.createMessage).Methods("POST")
}
