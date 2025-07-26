import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import jobSlice from "./jobSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs:jobSlice
    +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  },
});

export default store;

