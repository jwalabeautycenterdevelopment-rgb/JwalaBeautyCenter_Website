import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/cart",
        method: "GET",
        token,
      });
      if (response?.data?.success === false)
        return thunkAPI.rejectWithValue(
          response?.data?.message || "Something went wrong"
        );
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchGuestCart = createAsyncThunk(
  "cart/fetchGuestCart",
  async ({ guestId }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/guest/cart/?guestId=${guestId}`,
        method: "GET",
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addGuestCartItem = createAsyncThunk(
  "cart/addGuestCartItem",
  async ({ guestId, item }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/guest/cart/add",
        method: "POST",
        body: {
          guestId,
          ...item,
        },
      });
      await thunkAPI.dispatch(fetchGuestCart({ guestId }));
      return response?.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addOrUpdateCartItem = createAsyncThunk(
  "cart/addOrUpdateCartItem",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/cart/add",
        method: "POST",
        token,
        body: payload,
      });
      await thunkAPI.dispatch(fetchCart());
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/cart/update",
        method: "PUT",
        token,
        body: payload,
      });
      await thunkAPI.dispatch(fetchCart());
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const updateGuestCartItem = createAsyncThunk(
  "cart/updateGuestCartItem",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/guest/cart/update`,
        method: "PUT",
        body: payload,
      });
      const { guestId } = payload;
      await thunkAPI.dispatch(fetchGuestCart({ guestId }));
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/cart/remove",
        method: "POST",
        token,
        body: payload,
      });
      await thunkAPI.dispatch(fetchCart());
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const removeGuestCartItem = createAsyncThunk(
  "cart/removeGuestCartItem",
  async (payload, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/guest/cart/remove",
        method: "POST",
        body: payload,
      });
      await thunkAPI.dispatch(fetchGuestCart({ guestId: payload?.guestId }));

      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
    loading: false,
    GetCartloading: false,
    message: null,
    error: null,
  },
  reducers: {
    clearMessage: (state) => {
      state.message = null;
      state.error = null;
    },
    clearCartState: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.GetCartloading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.GetCartloading = false;
        state.items = action.payload?.cart || [];
        state.totalQuantity = action.payload?.totals?.itemCount || 0;
        state.totalPrice = action.payload?.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.GetCartloading = false;
        state.error = action.payload || "Failed to fetch cart";
      })

      .addCase(fetchGuestCart.pending, (state) => {
        state.GetCartloading = true;
        state.error = null;
      })
      .addCase(fetchGuestCart.fulfilled, (state, action) => {
        state.GetCartloading = false;
        state.items = action.payload?.cart || [];
        state.totalQuantity = action.payload?.totals?.itemCount || 0;
        state.totalPrice = action.payload?.total || 0;
      })
      .addCase(fetchGuestCart.rejected, (state, action) => {
        state.GetCartloading = false;
        state.error = action.payload || "Failed to fetch guest cart";
      })

      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch guest cart";
      })

      .addCase(addGuestCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })

      .addCase(addOrUpdateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })

      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(removeGuestCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      });
  },
});

export const { clearCartState, clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
