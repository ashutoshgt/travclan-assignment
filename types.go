package main

type Hotel struct {
	ID        int      `json:"id"`
	Name      string   `json:"name"`
	Address   string   `json:"address"`
	Location  Location `json:"location"`
}

type Location struct {
	Lat  float64  `json:"lat"`
	Lon  float64  `json:"lon"`
}
