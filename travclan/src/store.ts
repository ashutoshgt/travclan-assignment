import { configureStore } from "@reduxjs/toolkit";

import hotelsReducer from "./hotelsSlice";

const store = configureStore({
    reducer:{
        hotels: hotelsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;