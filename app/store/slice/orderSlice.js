import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const placeOrder = createAsyncThunk(
  "order/placeOrder",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/order/place-order",
        method: "POST",
        token,
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to place order");
    }
  }
);

export const verifyOrder = createAsyncThunk(
  "order/verifyOrder",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/order/verify",
        method: "POST",
        token,
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to verify order");
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    checkoutData: null,
    checkoutMsg: null,
    checkoutError: null,
    orderData: null,
    verifyData: null,
    loading: false,
    placeOrderLoading: false,
    verifyLoading: false,
    error: null,
    message: null,
  },
  reducers: {
    clearOrderMessage(state) {
      state.message = null;
      state.checkoutMsg = null;
    },
    clearOrderError(state) {
      state.error = null;
      state.checkoutError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placeOrderLoading = true;
        state.checkoutError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeOrderLoading = false;
        state.orderData = action.payload;
        state.checkoutMsg = action.payload?.message;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeOrderLoading = false;
        state.checkoutError = action.payload;
      })

      .addCase(verifyOrder.pending, (state) => {
        state.verifyLoading = true;
        state.error = null;
      })
      .addCase(verifyOrder.fulfilled, (state, action) => {
        state.verifyLoading = false;
        state.verifyData = action.payload;
        state.message = action.payload?.message;
      })
      .addCase(verifyOrder.rejected, (state, action) => {
        state.verifyLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderMessage, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
