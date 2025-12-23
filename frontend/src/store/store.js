import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import studentDetailSlice from "./student-data"
import adminSlice from "./admin-slice/"

const store = configureStore({
  reducer: {
    auth: authReducer,
    student : studentDetailSlice,
    admin : adminSlice
  },
});

export default store;
