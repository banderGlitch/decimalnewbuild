import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    apiUrl: '',
    headerKey: '',
    headerValue: '',
    timerSetting:'',
  };


const formSlice = createSlice({
    name:"form", 
    initialState,
    reducers:{
        updateApiUrl: (state, action) => {
            state.apiUrl = action.payload;
          },
          updateHeaderKey: (state, action) => {
            state.headerKey = action.payload;
          },
          updateHeaderValue: (state, action) => {
            state.headerValue = action.payload;
          },
          updateTimerValue: (state,action) => {
            state.timerSetting = action.payload;
          },
          resetRows: () => {
            return [];
          },
        
    }
})


export const { updateApiUrl, updateHeaderKey, updateHeaderValue, updateTimerValue , resetRows  } = formSlice.actions;


export default formSlice.reducer;
