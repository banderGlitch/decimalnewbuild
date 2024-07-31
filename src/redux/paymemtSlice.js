import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Ratecard:"",
    TotalValueAllocated: "",
    ApprovedRewards:""
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
    },
    updateApprovedRewards : (state,action) => {
      state.ApprovedRewards = action.payload;
  }
  },
});

export const {  updateRatecard ,   updateTotalValueAllocated ,  updateApprovedRewards} = paymentSlice.actions;
export default paymentSlice.reducer;
