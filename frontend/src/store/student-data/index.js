import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import URL from "../../constants";

//global initial state
const initialState = {
  studentData: null,
  isLoading: true,
};

export const getStudentData = createAsyncThunk("/student/data", async () => {
  const response = await axios.get(`${URL}api/v1/student/get/me`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
  console.log("124-> ", response.data);

  return response.data;
});

export const updateStudentData = createAsyncThunk(
  "/student/update-data",
  async (data) => {
    const response = await axios.patch(`${URL}api/v1/student/update/me`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("1255-> ", response.data);

    return response.data;
  }
);

const studentDetailSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudentData.rejected, (state) => {
        (state.isLoading = false),
          (state.isAuthenticated = false),
          (state.user = null);
      })
      .addCase(getStudentData.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.studentData = action.payload.success && action.payload.user);
      });
  },
});

export const { studentDetail } = studentDetailSlice.actions;
export default studentDetailSlice.reducer;
