import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import './App.css';
import HotelTable from './components/HotelTable';
import HotelMapComponent from './components/Map';
import SearchBar from './components/Search';
import { useAppDispatch } from './hooks';
import { fetchHotels } from './hotelsSlice';

mapboxgl.accessToken = 'pk.eyJ1IjoiYXNodXRvc2hndXB0YSIsImEiOiJjazl2OTAxODkwMjVsM2txbjg2dHViZHU3In0.N81A20aNf0S4HPbXAhOZXA';

function App() {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHotels())
  }, []);
  
  return (
    <div className='App flex'>
      <div className='w-1/3'>
       <SearchBar />
       <HotelTable />
      </div>
      <div className='w-2/3'>
        <HotelMapComponent/>
      </div>
    </div>
  );
}

export default App;
