package main

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
)

type clientHandler struct {
	staticPath string
	indexPath  string
}

func (ch clientHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	path, err := filepath.Abs(r.URL.Path)
	fmt.Println(path)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	path = filepath.Join(ch.staticPath, path)

	fmt.Println(path)

	_, err = os.Stat(path)
	if os.IsNotExist(err) {
		http.ServeFile(w, r, filepath.Join(ch.staticPath, ch.indexPath))
		return
	} else if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	http.FileServer(http.Dir(ch.staticPath)).ServeHTTP(w, r)
}

func serveClient() {
	client := clientHandler{staticPath: "../client/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(client)
}