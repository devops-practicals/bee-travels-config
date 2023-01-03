package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"text/template"
)

func k8sConfigHandler(w http.ResponseWriter, r *http.Request) {
	var body Config
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&body)
	if err != nil {
		log.Println("could not ready body")
	}

	fmt.Printf("%+v\n", body)

	tmpl := template.Must(template.ParseFiles("template/k8s.tmpl"))
	err = tmpl.Execute(w, body)
	if err != nil {
		log.Fatalln("could not render template")
	}
}

func openshiftConfigHandler(w http.ResponseWriter, r *http.Request) {
	var body Config
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&body)
	if err != nil {
		log.Println("could not ready body")
	}

	tmpl, err := template.ParseFiles("template/openshift.tmpl")
	if err != nil {
		log.Printf("error parsing template %v", err)
	}
	err = tmpl.Execute(w, body)
	if err != nil {
		log.Fatalln("could not render template")
	}
}
