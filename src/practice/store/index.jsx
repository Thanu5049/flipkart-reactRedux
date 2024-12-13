import { configureStore } from "@reduxjs/toolkit";
import  userSlice  from "./slices/UserSlice";

const store=configureStore({
    //here we are having only one reducer hence it will be the root reducer. or else it will be using combineReducers
    reducer:{
       // users:userSlice.reducer  // or these r the micro reducers
       users:userSlice,
    }
})
export default store;