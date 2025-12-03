import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";
import {
  clearTokenRefresh,
  setupTokenRefresh,
} from "@/app/utils/setupTokenRefresh";

export const verifyUser = createAsyncThunk(
  "auth/verifyUser",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/verify-otp`,
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

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/login`,
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

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/forgot-password`,
        method: "POST",
        body: payload,
        token,
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/reset-password?token=${payload?.token}`,
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

export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState()?.auth?.accessToken;
    const response = await FetchApi({
      endpoint: "/user/me",
      method: "GET",
      token,
    });
    return response?.data;
  } catch (err) {
    return handleError(err, thunkAPI);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.refreshToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/refresh",
        method: "POST",
        token,
      });
      return response?.data;
    } catch (err) {
      return handleError(err, thunkAPI);
    }
  }
);

export const updateShippingAddress = createAsyncThunk(
  "user/updateShippingAddress",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/shipping-address",
        method: "PUT",
        token,
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to update shipping address"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    otp: null,
    otpLoading: false,
    otpSuccess: null,
    otpError: null,
    refreshToken: null,
    accessToken: null,
    loginLoading: false,
    userData: null,
    fetchLoading: false,
    fetchMeError: null,
    loginSuccess: null,
    loginError: null,
    refreshLoading: false,
    refreshMessage: null,
    refreshError: null,
    forgotLoading: false,
    shippingAddress: null,
    updateLoading: false,
    updateSuccess: null,
    updateError: null,
    forgotPasswordSuccess: null,
    forgotPasswordError: null,
    resetPasswordLoading: false,
    resetPasswordError: null,
    resetPasswordSucess: null,
  },
  reducers: {
    clearAuthError(state) {
      state.otpError = null;
      state.updateError = null;
      state.loginError = null;
      state.forgotPasswordError = null;
      state.resetError = null;
      state.resetPasswordError = null;
    },
    clearAuthMessage(state) {
      state.updateSuccess = null;
      state.otpSuccess = null;
      state.loginSuccess = null;
      state.forgotPasswordSuccess = null;
      state.resetPasswordSucess = null;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.userData = null;
      localStorage.clear();
      clearTokenRefresh();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.otpLoading = true;
        state.error = null;
        state.otpSuccess = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.otp = action.payload?.user || null;
        state.otpSuccess = action.payload?.message || "OTP Sended successful";
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        localStorage.setItem("tokenExpiry", Date.now() + 50 * 60 * 1000);
        localStorage.setItem("loginTimestamp", Date.now());
        setupTokenRefresh();
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "Registration failed";
      })

      .addCase(loginUser.pending, (state) => {
        state.loginLoading = true;
        state.error = null;
        state.loginSuccess = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginSuccess = action.payload?.message || "Login successful";
        state.accessToken = action.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        localStorage.setItem("tokenExpiry", Date.now() + 50 * 60 * 1000);
        localStorage.setItem("loginTimestamp", Date.now());
        setupTokenRefresh();
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.payload || "Registration failed";
      })

      .addCase(forgotPassword.pending, (state) => {
        state.forgotLoading = true;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotLoading = false;
        state.forgotPasswordSuccess = action.payload?.message;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotLoading = false;
        state.forgotPasswordError = action.payload || "Registration failed";
      })

      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordLoading = true;
        state.resetError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordSucess = action?.payload?.message;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordLoading = false;
        state.resetPasswordError = action.payload || "Registration failed";
      })

      .addCase(fetchMe.pending, (state) => {
        state.fetchLoading = true;
        state.fetchMeError = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.fetchLoading = false;
        state.userData = action.payload;
        state.shippingAddress = action.payload.shippingAddress || null;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.fetchLoading = false;
        state.fetchMeError = action.payload || "Registration failed";
      })

      .addCase(updateShippingAddress.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
        state.updateSuccess = null;
      })

      .addCase(updateShippingAddress.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateSuccess = action.payload?.message || "Address updated";
      })
      .addCase(updateShippingAddress.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload;
      })

      .addCase(refreshToken.pending, (state) => {
        state.refreshLoading = true;
        state.refreshError = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.refreshLoading = false;
        state.accessToken = action.payload?.accessToken;
        state.refreshToken =
          action.payload?.refreshToken || state?.refreshToken;
        localStorage.setItem("tokenExpiry", Date.now() + 50 * 60 * 1000);
        setupTokenRefresh();
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.refreshLoading = false;
        state.refreshError = action.payload;
      });
  },
});

export const { clearAuthMessage, clearAuthError, logout } = authSlice.actions;
export default authSlice.reducer;
