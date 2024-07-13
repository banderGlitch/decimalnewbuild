import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Ratecard:"",
    TotalValueAllocated: ""
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateRatecard: (state, action) => {
        state.Ratecard = action.payload;
      },

    updateTotalValueAllocated : (state,action) => {
        state.TotalValueAllocated = action.payload;
    }
  },
});

export const {  updateRatecard ,   updateTotalValueAllocated} = paymentSlice.actions;
export default paymentSlice.reducer;
