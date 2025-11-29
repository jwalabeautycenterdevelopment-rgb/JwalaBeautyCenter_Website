import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getUserSubCategory = createAsyncThunk(
  "user/subCategory",
  async (_, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: "/user/subCategory",
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getUserSubCategoryById = createAsyncThunk(
  "user/subCategoryById",
  async (id, thunkAPI) => {
    try {
      return await FetchApi({
        endpoint: `/user/subCategory/${id}`,
        method: "GET",
      });
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const subCategorySlice = createSlice({
  name: "userSubCategory",
  initialState: {
    loadingAll: false,
    subCategories: [],
    loadingDetail: false,
    subCategoryDetail: null,
    error: null,
    hasFetched: false,
  },
  reducers: {
    clearSubCategoryDetail(state) {
      state.subCategoryDetail = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserSubCategory.pending, (state) => {
        state.loadingAll = true;
        state.error = null;
      })
      .addCase(getUserSubCategory.fulfilled, (state, action) => {
        state.loadingAll = false;
        state.subCategories = action?.payload?.data?.subCategories || [];
        state.hasFetched = true;
      })
      .addCase(getUserSubCategory.rejected, (state, action) => {
        state.loadingAll = false;
        state.error = action?.payload || "Failed to fetch subcategories";
      })

      .addCase(getUserSubCategoryById.pending, (state) => {
        state.loadingDetail = true;
        state.error = null;
      })
      .addCase(getUserSubCategoryById.fulfilled, (state, action) => {
        state.loadingDetail = false;
        state.subCategoryDetail = action?.payload?.data || null;
      })
      .addCase(getUserSubCategoryById.rejected, (state, action) => {
        state.loadingDetail = false;
        state.error = action?.payload || "Failed to fetch subcategory";
      });
  },
});

export const { clearSubCategoryDetail } = subCategorySlice.actions;
export default subCategorySlice.reducer;
