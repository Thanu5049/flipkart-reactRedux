import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice';
import productSlice from './productSlice';
import fetchProductsReducer  from "./fetchProducts";
import {persistStore} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
// import sessionStorage from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

//this tells the redux where to store the state and what key to use
const persistConfig={
    key:"root",
    storage:storage
}

const rootReducer=combineReducers({
    cart:cartSlice,
    products:fetchProductsReducer
})

const persistedReducer=persistReducer(persistConfig,rootReducer);

const store=configureStore({
 reducer:persistedReducer
})

export const persistor=persistStore(store);
export default store;