import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Hotel } from './types';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNodXRvc2hndXB0YSIsImEiOiJjazl2OTAxODkwMjVsM2txbjg2dHViZHU3In0.N81A20aNf0S4HPbXAhOZXA';

function HotelRow({ hotel }: {hotel: Hotel}) {
  return (
    <tr>
      <td>{hotel.name}</td>
      <td>{hotel.address}</td>
      <td>{hotel.location.lat}, {hotel.location.lon}</td>
    </tr>
  );
}

function HotelTable({ hotels }: {hotels: Hotel[]}) {
  return (
    <div className="h-1/4 overflow-y-auto">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {
            hotels.map((hotel: Hotel): JSX.Element => {
              return <HotelRow hotel={hotel} key={hotel.id} />
            })
          }
        </tbody>
      </table>
    </div>
  );
}

function SearchBar() {
  return (
    <form>
      <input type="text" placeholder="Search..." />
    </form>
  );
}

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


function App() {

  const [hotels, setHotels] = useState([]);
  
  const fetchHotels = ()=>{
    fetch('http://localhost:8080/hotels')
      .then((response) => response.json())
      .then((data) => setHotels(data))
  };

  useEffect(() => {
    fetchHotels();
  }, []);
  
  return (
    <div className='App flex'>
      <div className='w-1/3'>
       <SearchBar />
       <HotelTable hotels={hotels} />
      </div>
      <div className='w-2/3'>
        <HotelMapComponent/>
      </div>
    </div>
  );
}

export default App;
