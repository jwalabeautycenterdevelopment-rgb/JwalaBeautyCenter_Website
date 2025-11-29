import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FetchApi } from "../../api/FetchApi";

export const getParentCategory = createAsyncThunk(
  "category/getCategory",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/category/categories",
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getParentCategoryDetails = createAsyncThunk(
  "category/getCategoryDetails",
  async ({ id }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/admin/subcategory/category/${id}`,
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const parentCategorySlice = createSlice({
  name: "parentcategory",
  initialState: {
    getAllCategories: [],
    getAllCategoryDetails: [],
    getAllCategoryDetailsMessage: null,
    loading: false,
    error: null,
    hasFetched: false,
  },
  reducers: {
    clearCategoryDetailsMessage(state) {
      state.getAllCategoryDetailsMessage = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getParentCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllCategories = action?.payload?.data || [];
        state.hasFetched = true;
      })
      .addCase(getParentCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Failed to fetch categories";
      })

      .addCase(getParentCategoryDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getParentCategoryDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.getAllCategoryDetails =
          action?.payload?.data?.subcategories || [];
        state.getAllCategoryDetailsMessage = action?.payload?.message;
      })
      .addCase(getParentCategoryDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || "Failed to fetch category details";
      });
  },
});

export const { clearCategoryDetailsMessage, clearError } =
  parentCategorySlice.actions;
export default parentCategorySlice.reducer;
