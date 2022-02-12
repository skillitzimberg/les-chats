package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

var router = mux.NewRouter()

func main() {
	config := NewDBConfig("chats", "foreignfood", "localhost", 5432)
	repo := NewRepo(NewDatabase(*config))
	repo.MigrateSchema()

	api := &API{*repo}
	api.registerEndpoints()

	serveClient()

	godotenv.Load()
	port := os.Getenv("PORT")
	listeningOn := fmt.Sprintf("127.0.0.1:%v", port)

	srv := &http.Server{
		Handler:      router,
		Addr:         listeningOn,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Println("We're listening on:", listeningOn)
	log.Fatal(srv.ListenAndServe())
}
