import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getAllBrands = createAsyncThunk(
  "user/brands/getAll",
  async (_, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: "/user/brands",
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getBrandBySlug = createAsyncThunk(
  "user/brands/getBySlug",
  async (slug, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: `/user/brands/products/${slug}`,
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);


const brandSlice = createSlice({
  name: "userBrands",
  initialState: {
    loadingAll: false,
    brands: [],
    loadingSlug: false,
    brandDetail: null,
    error: null,
    hasFetched: false,
  },

  reducers: {
    clearBrandDetail(state) {
      state.brandDetail = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.brands = action?.payload?.data?.brands || [];
        state.hasFetched = true;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action?.payload || "Failed to fetch brands";
      })

      .addCase(getBrandBySlug.pending, (state) => {
        state.loadingSlug = true;
        state.error = null;
      })
      .addCase(getBrandBySlug.fulfilled, (state, action) => {
        state.loadingSlug = false;
        state.brandDetail = action?.payload?.data || null;
      })
      .addCase(getBrandBySlug.rejected, (state, action) => {
        state.loadingSlug = false;
        state.error = action?.payload || "Failed to fetch brand by slug";
      });
  },
});

export const { clearBrandDetail } = brandSlice.actions;
export default brandSlice.reducer;
