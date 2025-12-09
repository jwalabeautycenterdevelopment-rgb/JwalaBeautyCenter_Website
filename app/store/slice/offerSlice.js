import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/offers",
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch offers");
    }
  }
);

export const discountOffers = createAsyncThunk(
  "offers/discountOffers",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/offers/discountOffer",
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch offers");
    }
  }
);
export const fetchOfferById = createAsyncThunk(
  "offers/fetchOfferById",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/offers/single/${id}`,
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to fetch offer");
    }
  }
);

const offerSlice = createSlice({
  name: "offers",
  initialState: {
    offersList: [],
    discountoffersList: [],
    singleOffer: null,
    loadingOffers: false,
    loadingOfferById: false,
    successMsg: null,
    errorMsg: null,
  },

  reducers: {
    clearOfferMessage(state) {
      state.successMsg = null;
    },
    clearOfferError(state) {
      state.errorMsg = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getOffers.pending, (state) => {
        state.loadingOffers = true;
        state.errorMsg = null;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.loadingOffers = false;
        state.offersList = action.payload?.offers || action.payload;
        state.successMsg = action.payload?.message || "Offers fetched";
      })
      .addCase(getOffers.rejected, (state, action) => {
        state.loadingOffers = false;
        state.errorMsg = action.payload;
      })

      .addCase(discountOffers.pending, (state) => {
        state.loadingOffers = true;
        state.errorMsg = null;
      })
      .addCase(discountOffers.fulfilled, (state, action) => {
        state.loadingOffers = false;
        state.discountoffersList = action.payload || action.payload;
        state.successMsg = action.payload?.message || "Offers fetched";
      })
      .addCase(discountOffers.rejected, (state, action) => {
        state.loadingOffers = false;
        state.errorMsg = action.payload;
      })
      .addCase(fetchOfferById.pending, (state) => {
        state.loadingOfferById = true;
        state.errorMsg = null;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.loadingOfferById = false;
        state.singleOffer = action.payload?.offer || action.payload;
        state.successMsg = action.payload?.message || "Offer fetched";
      })
      .addCase(fetchOfferById.rejected, (state, action) => {
        state.loadingOfferById = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { clearOfferMessage, clearOfferError } = offerSlice.actions;
export default offerSlice.reducer;
