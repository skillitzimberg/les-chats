package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)
var router = mux.NewRouter()

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
	router.HandleFunc("/api/users", getUsers)
	router.HandleFunc("/api/users/{id}", getUser)
	router.HandleFunc("/api/messages", getMessages)
	router.HandleFunc("/api/messages/{id}", getMessage)
}