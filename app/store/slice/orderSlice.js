import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/order",
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch order");
    }
  }
);

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
      return response;
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
    orderData: null,
    placeOrderData: null,

    verifyData: null,

    loadingOrders: false,
    loadingPlaceOrder: false,
    loadingVerify: false,

    successMsg: null,
    errorMsg: null,
  },

  reducers: {
    clearOrderMessage(state) {
      state.successMsg = null;
    },
    clearOrderError(state) {
      state.errorMsg = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loadingOrders = true;
        state.errorMsg = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loadingOrders = false;
        state.orderData = action.payload?.orders || action.payload;
        state.successMsg = action.payload?.message || "Orders fetched";
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loadingOrders = false;
        state.errorMsg = action.payload;
      })

      .addCase(placeOrder.pending, (state) => {
        state.loadingPlaceOrder = true;
        state.errorMsg = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loadingPlaceOrder = false;
        state.placeOrderData = action.payload?.data || action.payload;
        state.successMsg = action.payload?.message || "Order placed";
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loadingPlaceOrder = false;
        state.errorMsg = action.payload;
      })

      .addCase(verifyOrder.pending, (state) => {
        state.loadingVerify = true;
        state.errorMsg = null;
      })
      .addCase(verifyOrder.fulfilled, (state, action) => {
        state.loadingVerify = false;
        state.verifyData = action.payload;
        state.successMsg = action.payload?.message || "Order verified";
      })
      .addCase(verifyOrder.rejected, (state, action) => {
        state.loadingVerify = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { clearOrderMessage, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;
