package main

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
	"time"
)

const HOTEL_INDEX = "hotels"

func hotelHandler(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("name")

	tlLatstr := r.URL.Query().Get("tl_lat")
	tlLonstr := r.URL.Query().Get("tl_lon")
	brLatstr := r.URL.Query().Get("br_lat")
	brLonstr := r.URL.Query().Get("br_lon")

	var bounds Bounds

	if tlLatstr != "" && tlLonstr != "" && brLatstr != "" && brLonstr != "" {
		tlLat, err := strconv.ParseFloat(tlLatstr, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid top left latitude"))
			return
		}
		
		tlLon, err := strconv.ParseFloat(tlLonstr, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid top left longitude"))
			return
		}
		
		brLat, err := strconv.ParseFloat(brLatstr, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid bottom right latitude"))
			return
		}
		
		brLon, err := strconv.ParseFloat(brLonstr, 64)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Invalid bottom right longitude"))
			return
		}

		if tlLat < brLat || tlLon > brLon {
			w.WriteHeader(http.StatusBadRequest)
			w.Write([]byte("Co-ordinates may not be in the correct order"))
			return
		}

		bounds = Bounds{tlLat, tlLon, brLat, brLon}
	}
	
	var hotels *[]Hotel
	
	hotels = searchHotels(name, &bounds)
	
	jsonResp, err := json.Marshal(hotels)
	
	if err != nil {
		log.Printf("Error in JSON marshalling hotels. Err: %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Something went wrong"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Content-Type", "application/json")
	
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