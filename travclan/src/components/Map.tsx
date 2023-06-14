import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

function HotelMapComponent() {

    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
  
    const [lng, setLng] = useState(77.22187713523259);
    const [lat, setLat] = useState(28.63263579001517);
    const [zoom, setZoom] = useState(14);
  
    useEffect(() => {
      if (map.current) return; // initialize map only once
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: zoom
      });
    });
  
    return (
      <div ref={mapContainer} className='mapContainer'/>
    );
}

export default HotelMapComponent