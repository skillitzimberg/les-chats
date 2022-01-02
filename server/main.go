package main

import (
	"log"
	"net/http"
)

func serveClient() {
	client := clientHandler{staticPath: "../client/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(client)
}

func main() {
	serveClient()
	registerEndpoints()
	
	log.Println("Listening on :3000...")
	err := http.ListenAndServe(":3000", router)
	if err != nil {
		log.Fatal(err)
	}
}