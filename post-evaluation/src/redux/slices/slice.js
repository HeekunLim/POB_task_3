import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rate: {},
};

const rateSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setRate(state, action) {
      state.rate = action.payload;
    },
  },
});

export const { setRate } = rateSlice.actions;

export default rateSlice.reducer;
