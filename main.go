package main

import (
	"fmt"
	"net/http"
	"encoding/json"
	"log"
)

func hotelHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.URL)
	name := r.URL.Query().Get("name")
	
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	
	resp := map[string]string{
		"name": name,
	}
	
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
}


func main()  {
	es()
	log.Println("Starting server")
	http.HandleFunc("/hotels", hotelHandler)
	http.ListenAndServe(":8080", nil)
}