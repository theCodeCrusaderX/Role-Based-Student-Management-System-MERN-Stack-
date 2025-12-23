import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import URL from "../../constants";

//global initial state
const initialState = {
  studentData: null,
  isLoading: true,
};

export const getAllStudentData = createAsyncThunk("/admin/data", async () => {
  const response = await axios.get(`${URL}api/v1/admin/get/all`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
  console.log("124-> ", response.data);

  return response.data;
});

export const updateStudentDataAsId = createAsyncThunk(
  "/student/update-data",
  async ({data,studentId}) => {
    const response = await axios.patch(`${URL}api/v1/admin/student-data/update/${studentId}`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("1255-> ", response.data);

    return response.data;
  }
);


export const deleteStudent = createAsyncThunk("/admin/student/delete", async (studentId) => {
  const response = await axios.delete(
    `${URL}api/v1/admin/student-data/delete/${studentId}`,
    {},
    {
      withCredentials: true,
    }
  );
  console.log("loged out user -> ", response.data);

  return response.data;
});

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudentData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllStudentData.rejected, (state) => {
        state.isLoading = false;
        state.studentData = null;
      })
      .addCase(getAllStudentData.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.studentData = action.payload.success && action.payload.user);
      })
      .addCase(updateStudentDataAsId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStudentDataAsId.rejected, (state) => {
        state.isLoading = false;
        state.studentData = null;
      })
      .addCase(updateStudentDataAsId.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.studentData = action.payload.success && action.payload.user);
      });
  },
});

export const { adminData } = adminSlice.actions;
export default adminSlice.reducer;
