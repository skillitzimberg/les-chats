package main

import (
	"log"
	"net/http"
)

func serveClient() {
	fs := http.FileServer(http.Dir("../client/build"))
	http.Handle("/", fs)
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