import { configureStore } from "@reduxjs/toolkit";
import rateReducer from "./slices/slice";

const store = configureStore({
  reducer: {
    rate: rateReducer,
  },
});

export default store;
