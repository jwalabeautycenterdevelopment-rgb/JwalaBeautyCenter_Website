import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBanner = createAsyncThunk(
  "banner/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/userBanner",
        method: "GET",
      });
      if (!response?.data?.banners) {
        throw new Error("Invalid response from server");
      }

      return response.data.banners;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Something went wrong");
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    allBanners: [],
    bannerLoading: false,
    error: null,
    createMsg: null,
    deleteMsg: null,
    hasFetched: false,
  },
  reducers: {
    clearCreateMsg: (state) => {
      state.createMsg = null;
    },
    clearDeleteMsg: (state) => {
      state.deleteMsg = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBanner.pending, (state) => {
        state.bannerLoading = true;
        state.error = null;
      })
      .addCase(getBanner.fulfilled, (state, action) => {
        state.bannerLoading = false;
        state.allBanners = action.payload;
        state.hasFetched = true;
      })
      .addCase(getBanner.rejected, (state, action) => {
        state.bannerLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCreateMsg, clearDeleteMsg } = bannerSlice.actions;
export default bannerSlice.reducer;
