package main

import (
	"log"

	"github.com/elastic/go-elasticsearch/v8"
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

