package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

func createUser(w http.ResponseWriter, r *http.Request) {
	var newUser user
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Could not read the request body.")
	}
	
	json.Unmarshal(reqBody, &newUser)
	// Check users to make sure that the newUser is not a duplicate
	if isUniqueUser(newUser) {
		users = append(users, newUser)
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(newUser)
		return
	}
	
	w.WriteHeader(http.StatusConflict)
	json.NewEncoder(w).Encode(fmt.Sprintf("Username: %s already in use.", newUser.Username))
}

func getUsers(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(users)
}

func getUser(w http.ResponseWriter, r *http.Request) {
	var user user
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		json.NewEncoder(w).Encode(fmt.Sprintf("Invalid ID: %v", vars["id"]))
		return
	}
		for _, usr := range users {
			if id > 0 && usr.Id == id {
				user = usr
				json.NewEncoder(w).Encode(user)
				return
			}
		}
		json.NewEncoder(w).Encode(fmt.Sprintf("User %v not found", id))
}

func createMessage(w http.ResponseWriter, r *http.Request) {
	var newMessage message
	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Fprintf(w, "Could not read the request body")
	}
	json.Unmarshal(reqBody, &newMessage)
	messages = append(messages, newMessage)
	json.NewEncoder(w).Encode(newMessage)
}

func getMessages(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(messages)
}

func getMessage(w http.ResponseWriter, r *http.Request) {
	var message message
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		json.NewEncoder(w).Encode(fmt.Sprintf("Invalid ID: %v", vars["id"]))
		return
	} 
	for _, msg := range messages {
		if msg.Id == id {
			message = msg
			json.NewEncoder(w).Encode(message)
			return
		}
	}
		json.NewEncoder(w).Encode(fmt.Sprintf("Message %v not found", id))
}

func registerEndpoints() {
	router.HandleFunc("/api/users", createUser).Methods("POST")
	router.HandleFunc("/api/users", getUsers).Methods("GET")
	router.HandleFunc("/api/users/{id}", getUser).Methods("GET")

	router.HandleFunc("/api/messages", createMessage).Methods("POST")
	router.HandleFunc("/api/messages", getMessages).Methods("GET")
	router.HandleFunc("/api/messages/{id}", getMessage).Methods("GET")
}