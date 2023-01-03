package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()

	r.HandleFunc("/api/v1/config/k8s", k8sConfigHandler).Methods(http.MethodPost)
	r.HandleFunc("/api/v1/config/openshift", openshiftConfigHandler).Methods(http.MethodPost)

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("client/build/"))).Methods(http.MethodGet)

	port := ":8080"
	log.Printf("starting server at port : %s", port)
	log.Fatalln(http.ListenAndServe(port, r))
}
