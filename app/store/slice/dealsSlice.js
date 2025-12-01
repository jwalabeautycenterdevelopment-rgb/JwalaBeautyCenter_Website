import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getActiveDailyDeals = createAsyncThunk(
  "user/dailyDeals/getActive",
  async (_, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: "/user/daily-deals/active",
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getDailyDealById = createAsyncThunk(
  "user/dailyDeals/getById",
  async (id, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: `/user/daily-deals/${id}`,
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getDailyDealBySlug = createAsyncThunk(
  "user/dailyDeals/getBySlug",
  async (slug, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: `/user/daily-deals/slug/${slug}`,
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const dailyDealsSlice = createSlice({
  name: "userDailyDeals",
  initialState: {
    loadingAll: false,
    deals: [],
    loadingDetail: false,
    dealDetail: null,
    slugDetail: null,
    loadingSlug: false,
    error: null,
    hasFetched: false,
  },
  reducers: {
    clearDealDetail(state) {
      state.dealDetail = null;
      state.slugDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getActiveDailyDeals.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(getActiveDailyDeals.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.deals = action?.payload?.data?.deals || [];
        state.hasFetched = true;
      })
      .addCase(getActiveDailyDeals.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action?.payload || "Failed to fetch active daily deals";
      })

      .addCase(getDailyDealById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(getDailyDealById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.dealDetail = action?.payload?.data || null;
      })
      .addCase(getDailyDealById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action?.payload || "Failed to fetch deal by ID";
      })

      .addCase(getDailyDealBySlug.pending, (state) => {
        state.loadingSlug = true;
        state.error = null;
      })
      .addCase(getDailyDealBySlug.fulfilled, (state, action) => {
        state.loadingSlug = false;
        state.slugDetail = action?.payload?.data || null;
      })
      .addCase(getDailyDealBySlug.rejected, (state, action) => {
        state.loadingSlug = false;
        state.error = action?.payload || "Failed to fetch deal by slug";
      });
  },
});

export const { clearDealDetail } = dailyDealsSlice.actions;
export default dailyDealsSlice.reducer;
