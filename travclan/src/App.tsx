import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Hotel } from './types';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

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
  const rows:JSX.Element[] = [];

  hotels.forEach((hotel) => {
    rows.push(
      <HotelRow
        hotel={hotel}
        key={hotel.id} />
    );
  });

  return (
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
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

const HOTELS = [
  {"id":1,"name":"Johns-Sauer","address":"3556 Portage Pass","location": {"lat":28.786611,"lon":77.136189}},
  {"id":2,"name":"Kutch, Hyatt and Morissette","address":"29603 Northland Drive","location": {"lat":28.468263,"lon":76.890521}},
  {"id":3,"name":"Wilkinson Inc","address":"277 Manufacturers Street","location": {"lat":28.498421,"lon":77.030328}},
  {"id":4,"name":"Hudson and Sons","address":"00 Grayhawk Park","location": {"lat":28.68445,"lon":77.337308}},
  {"id":5,"name":"Blanda, Cassin and Jaskolski","address":"45 Petterle Junction","location": {"lat":28.823993,"lon":77.478053}},
  {"id":6,"name":"Swaniawski-Feest","address":"94260 1st Lane","location": {"lat":28.798452,"lon":77.364951}},
  {"id":7,"name":"Feil, Bogan and Roberts","address":"917 Beilfuss Hill","location": {"lat":28.666975,"lon":77.450314}},
  {"id":8,"name":"Ryan, Reichel and Wyman","address":"09 Del Sol Avenue","location": {"lat":28.473493,"lon":76.973579}},
  {"id":9,"name":"Prohaska-Nader","address":"71597 Lyons Trail","location": {"lat":28.711042,"lon":77.063294}},
  {"id":10,"name":"Borer Inc","address":"57 Forest Dale Court","location": {"lat":28.834291,"lon":77.427318}}
];

function App() {

  const [hotels, setHotels] = useState(HOTELS);
  
  const fetchHotels = ()=>{
    fetch('http://localhost:8080/hotels')
      .then((response) => response.json())
      .then((data) => setHotels(data))
  }

  useEffect(() => {
    fetchHotels();
  }, []);
  
  return (
    <div className="App">
      <SearchBar />
      <HotelTable hotels={hotels} />
      <HotelMapComponent/>
    </div>
  );
}

export default App;
