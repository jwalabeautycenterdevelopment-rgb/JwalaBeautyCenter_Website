import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getUserAdBanners = createAsyncThunk(
  "user/adBanner/getAll",
  async (_, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: "/user/ad-banner",
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getUserAdBannerById = createAsyncThunk(
  "user/adBanner/getById",
  async (id, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: `/user/ad-banner/${id}`,
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const adBannerSlice = createSlice({
  name: "userAdBanner",
  initialState: {
    loadingAll: false,
    allBanners: [],
    loadingDetail: false,
    bannerDetail: null,
    error: null,
    hasFetched: false,
  },
  reducers: {
    clearBannerDetail(state) {
      state.bannerDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAdBanners.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(getUserAdBanners.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.allBanners = action?.payload?.data || [];
        state.hasFetched = true;
      })
      .addCase(getUserAdBanners.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action?.payload || "Failed to fetch ad banners";
      })

      .addCase(getUserAdBannerById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(getUserAdBannerById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.bannerDetail = action?.payload?.data || null;
      })
      .addCase(getUserAdBannerById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action?.payload || "Failed to fetch ad banner";
      });
  },
});

export const { clearBannerDetail } = adBannerSlice.actions;

export default adBannerSlice.reducer;
