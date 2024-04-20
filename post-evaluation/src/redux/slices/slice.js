import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rates: [],
};

const rateSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    setRates(state, action) {
      state.rates = action.payload;
    },
    changeRate: (state, action) => {
      const { checkid, newScore } = action.payload;
      const index = state.rates.findIndex((rate) => rate.id === checkid);

      state.rates[index].rate = newScore;
    },
  },
});

export const { setRates, changeRate } = rateSlice.actions;

export default rateSlice.reducer;
