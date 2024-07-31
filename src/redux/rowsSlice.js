import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const rowsSlice = createSlice({
  name: 'rows',
  initialState,
  reducers: {
    addRow: (state, action) => {
      state.push(action.payload);
    },
    updateRow: (state, action) => {
      const { id, field, value } = action.payload;
      const row = state.find((row) => row.id === id);
      if (row) {
        row[field] = value;
      }
    },
    deleteRow: (state, action) => {
      return state.filter((row) => row.id !== action.payload);
    },
    setRows: (state, action) => {
        return action.payload;
      },
    resetRowsOutput: () => {
        return [];
      },
    resetRows: () => initialState,
  },
});

export const { addRow, updateRow, deleteRow, resetRows , setRows, resetRowsOutput} = rowsSlice.actions;
export default rowsSlice.reducer;
