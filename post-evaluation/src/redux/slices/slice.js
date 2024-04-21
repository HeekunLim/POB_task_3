import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rates: [],
  score: 0,
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
    setScore(state, action) {
      state.score = action.payload;
    },
  },
});

export const { setRates, changeRate, setScore } = rateSlice.actions;

export default rateSlice.reducer;
