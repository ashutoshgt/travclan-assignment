import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LngLatBounds } from 'mapbox-gl';
import { AppDispatch } from './store';
import { Hotel } from './types';


const initialState: {hotels: Hotel[]} = {hotels: []};

export const hotelsSlice = createSlice({
  name: 'hotels',
  initialState,
  reducers: {
    setHotels: (state, action: PayloadAction<Hotel[]>) => {
      state.hotels = action.payload;
    }
  }
})

export const fetchHotels = (name?: String, bounds?: LngLatBounds) => async (dispatch: AppDispatch, getState: any) => {
  const response = await fetch('http://localhost:8080/hotels');
  const hotels = await response.json();
  dispatch(setHotels(hotels));
}

export const {setHotels} = hotelsSlice.actions;

export default hotelsSlice.reducer