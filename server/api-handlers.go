package main

import (
	"encoding/json"
	"fmt"
	"log"
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
		log.Print("Could not convert id to integer: ", vars["id"])
	}
	if id < len(users) {
		user = users[id]
		json.NewEncoder(w).Encode(user)
	} else {
		json.NewEncoder(w).Encode(fmt.Sprintf("User %v not found", id))
	}
}

func getMessages(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(messages)
}

func registerEndpoints() {
	router.HandleFunc("/api/users", getUsers)
	router.HandleFunc("/api/users/{id}", getUser)
	router.HandleFunc("/api/messages", getMessages)
}