package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

const HOTEL_INDEX = "hotels"

func hotelHandler(w http.ResponseWriter, r *http.Request) {
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
	
	// Connecting to ElasticSearch and waiting till it's ready
	for {
		if esConnection := getESConnection(); esConnection != nil {
			break
		}
		time.Sleep(5 * time.Second)
	}

	createHotelIndex()
	populateHotelIndex()

	http.HandleFunc("/hotels", hotelHandler)
	log.Println("Starting server on http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}