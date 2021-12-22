package main

import (
	"encoding/json"
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
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Print("Could not convert id to integer: ", vars["id"])
	}
	json.NewEncoder(w).Encode(users[id])
}

func registerEndpoints() {
	router.HandleFunc("/api/users", getUsers)
	router.HandleFunc("/api/users/{id}", getUser)
}