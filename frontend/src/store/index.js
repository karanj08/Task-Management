import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./auth.slice";

const store = configureStore({
  reducer: {
    auth: authreducer,
  },
});

export default store;
