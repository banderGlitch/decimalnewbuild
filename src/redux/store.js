import { configureStore } from "@reduxjs/toolkit";
import formReducer from './formSlice';
import rowsReducer from "./rowsSlice";
import paymentReducer from './paymemtSlice';

const store = configureStore({
    reducer: {
      form: formReducer,
      rows: rowsReducer,
      payment : paymentReducer
    },
  });
  
  export default store;


  