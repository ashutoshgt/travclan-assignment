package main

import (
	"bytes"
	"context"
	"encoding/json"
	"io/ioutil"
	"log"
	"strconv"
	"time"

	"github.com/elastic/go-elasticsearch/v8"
	"github.com/elastic/go-elasticsearch/v8/esutil"
	"github.com/elastic/go-elasticsearch/v8/typedapi/indices/create"
	"github.com/elastic/go-elasticsearch/v8/typedapi/types"
)

var esConn *elasticsearch.TypedClient

func getESConnection() *elasticsearch.TypedClient {
	
	if esConn != nil {
		return esConn
	}
	
	conn, err := elasticsearch.NewTypedClient(elasticsearch.Config{})
	
	if err != nil {
		log.Printf("Error creating the client: %s", err)
		return nil
	}
	
	isHealthy, err := conn.HealthReport().IsSuccess(nil)
	
	if err != nil {
		log.Printf("Cluster isn't ready, error: %s, healthy: %t", err, isHealthy)
		return nil
	}
	log.Println("Connected to ES")
	esConn = conn
	return esConn
}

func createHotelIndex() {

	exists, err := esConn.Indices.Exists(HOTEL_INDEX).IsSuccess(nil)

	if err != nil {
		log.Printf("Error while checking existence of %s index: %s", HOTEL_INDEX, err)
	}

	if exists {
		log.Println("Index already exists")
		return
	}

	log.Printf("Creating the %s index", HOTEL_INDEX)
	
	_, err = esConn.Indices.Create(HOTEL_INDEX).
		Request(&create.Request{
			Mappings: &types.TypeMapping{
				Properties: map[string]types.Property{
					"id": types.NewIntegerNumberProperty(),
					"name": types.NewTextProperty(),
					"address": types.NewTextProperty(),
					"location": types.NewGeoPointProperty(),
				},
			},
		}).Do(nil)
	
	if err != nil {
		log.Printf("Error creating the %s index: %s", HOTEL_INDEX, err)
	}

	log.Printf("Successfully created the %s index", HOTEL_INDEX)
}

func populateHotelIndex() {
	var hotels []*Hotel

	// Creating another client as TypedClient is not compatible with BulkIndexer
	es, err := elasticsearch.NewClient(elasticsearch.Config{
		// Retry on 429 TooManyRequests statuses
		//
		RetryOnStatus: []int{502, 503, 504, 429},

		// Retry up to 5 attempts
		//
		MaxRetries: 5,
	})
	
	if err != nil {
		log.Fatalf("Error creating the client: %s", err)
	}
	
	bulkIndexer, err := esutil.NewBulkIndexer(esutil.BulkIndexerConfig{
		Index: HOTEL_INDEX,
		Client: es,
		NumWorkers: 2,
		FlushInterval: 1 * time.Second,
	})

	// Reading hotel data in a json file
	file, err := ioutil.ReadFile("hotels.json")
    if err != nil {
        log.Printf("Error reading hotels.json file: %s", err)
    }
    err = json.Unmarshal(file, &hotels)
    if err != nil {
        log.Printf("Error marshalling json: %s", err)
    }
    
	for _, hotel := range hotels {

		data, err := json.Marshal(hotel)
		if err != nil {
			log.Printf("Cannot encode hotel %d: %s", hotel.ID, err)
		}

		err = bulkIndexer.Add(
			context.Background(),
			esutil.BulkIndexerItem{
				// Action field configures the operation to perform (index, create, delete, update)
				Action: "index",

				// DocumentID is the (optional) document ID
				DocumentID: strconv.Itoa(hotel.ID),

				// Body is an `io.Reader` with the payload
				Body: bytes.NewReader(data),

				// OnSuccess is called for each successful operation
				OnSuccess: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem) {
					log.Printf("Indexed hotel id: %s", item.DocumentID)
				},

				// OnFailure is called for each failed operation
				OnFailure: func(ctx context.Context, item esutil.BulkIndexerItem, res esutil.BulkIndexerResponseItem, err error) {
					if err != nil {
						log.Printf("ERROR: %s", err)
					} else {
						log.Printf("ERROR: %s: %s", res.Error.Type, res.Error.Reason)
					}
				},
			},
		)
	}
}