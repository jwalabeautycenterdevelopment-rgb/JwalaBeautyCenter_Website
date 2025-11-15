import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const registerUser = createAsyncThunk(
  "register/user",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user`,
        method: "POST",
        body: payload,
      });
      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Something went wrong");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "register/otp",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/resendotp`,
        method: "POST",
        body: payload,
      });
      if (response?.data?.success === false) {
        return thunkAPI.rejectWithValue(response?.data?.errors);
      }
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Something went wrong");
    }
  }
);

const registerSlice = createSlice({
  name: "register",
  initialState: {
    email: null,
    loading: false,
    error: null,
    message: null,
    resendSuccess: null,
    resendError: null,
  },
  reducers: {
    clearError(state) {
      state.error = null;
      state.resendError = null;
    },
    clearMessage(state) {
      state.message = null;
      state.resendSuccess = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload?.email || null;
        state.message = action.payload?.message || "Registration successful";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.resendError = null;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.resendSuccess = action.payload?.message || "Otp Send successful";
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.resendError = action.payload || "Registration failed";
      });
  },
});

export const { clearError, clearMessage } = registerSlice.actions;
export default registerSlice.reducer;
