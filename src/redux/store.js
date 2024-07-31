import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import rowsReducer from "./rowsSlice";
import paymentReducer from './paymemtSlice';
import authSlice from "./authSlice";

const store = configureStore({
    reducer: {
      form: formReducer,
      rows: rowsReducer,
      payment : paymentReducer,
      auth : authSlice
    },
  });
  
  export default store;


  