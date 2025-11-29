import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOffers = createAsyncThunk(
  "offer/getOffers",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/offers",
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const offersSlice = createSlice({
  name: "offers",
  initialState: {
    allOffers: [],
    loadingGet: false,
    errorGet: null,
    hasFetched: false,
  },

  reducers: {
    clearGetOfferError(state) {
      state.errorGet = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getOffers.pending, (state) => {
        state.loadingGet = true;
        state.errorGet = null;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.loadingGet = false;
        state.allOffers = action?.payload?.data?.offers || [];
        state.hasFetched = true;
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.loadingGet = false;
        state.errorGet = action?.payload || "Failed to fetch offers";
      });
  },
});

export const { clearGetOfferError } = offersSlice.actions;

export default offersSlice.reducer;
