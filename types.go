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

type Bounds struct {
	TLLat float64
	TLLon float64
	BRLat float64
	BRLon float64
}

func (bounds *Bounds)isEmpty() bool {
	return bounds.BRLat==0 && bounds.BRLon==0 && bounds.TLLat==0 && bounds.TLLon==0
}