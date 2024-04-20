import { configureStore } from "@reduxjs/toolkit";
import RateReducer from "./slices/slice";

const store = configureStore({
  reducer: {
    rates: RateReducer,
  },
});

export default store;
