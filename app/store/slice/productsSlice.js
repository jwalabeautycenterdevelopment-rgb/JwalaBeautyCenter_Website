import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (query, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/search${query ? `?q=${query}` : ""}`,
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getCategoryProducts = createAsyncThunk(
  "products/subCategoryProducts",
  async (slug, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/subcategory/${slug}`,
        method: "GET",
      });

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getUserProducts = createAsyncThunk(
  "products/getUserProducts",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/products",
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getSingleProduct = createAsyncThunk(
  "products/getSingleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/singleProduct/${productId}`,
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const getBestSellers = createAsyncThunk(
  "products/getBestSellers",
  async (_, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: "/user/products/best-sellers",
        method: "GET",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const addProductReview = createAsyncThunk(
  "products/addProductReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/${productId}/review`,
        method: "POST",
        body: reviewData,
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const editProductReview = createAsyncThunk(
  "products/editProductReview",
  async ({ productId, reviewId, reviewData }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/${productId}/review/${reviewId}`,
        method: "PATCH",
        body: reviewData,
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "products/deleteProductReview",
  async ({ productId, reviewId }, thunkAPI) => {
    try {
      const response = await FetchApi({
        endpoint: `/user/products/${productId}/review/${reviewId}`,
        method: "DELETE",
      });
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    searchResults: [],
    loadingSearch: false,
    errorSearch: null,

    userProducts: [],
    loadingUserProducts: false,
    errorUserProducts: null,

    categoryProducts: [],
    userCategoryProducts: false,
    userCategoryProductsError: null,

    singleProduct: null,
    loadingSingle: false,
    errorSingle: null,

    bestSellers: [],
    loadingBestSellers: false,
    errorBestSellers: null,

    loadingReviewAction: false,
    errorReviewAction: null,
    successReviewAction: false,
  },

  reducers: {
    clearProductErrors(state) {
      state.errorSearch = null;
      state.errorUserProducts = null;
      state.errorSingle = null;
      state.errorBestSellers = null;
      state.errorReviewAction = null;
      state.userCategoryProductsError = null;
    },
    clearReviewSuccess(state) {
      state.successReviewAction = false;
    },
    clearSingleProduct(state) {
      state.singleProduct = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loadingSearch = true;
        state.errorSearch = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loadingSearch = false;
        state.searchResults = action.payload?.data || [];
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadingSearch = false;
        state.errorSearch = action.payload || "Failed to search products";
      });

    builder
      .addCase(getCategoryProducts.pending, (state) => {
        state.userCategoryProducts = true;
        state.userCategoryProductsError = null;
      })
      .addCase(getCategoryProducts.fulfilled, (state, action) => {
        state.userCategoryProducts = false;
        state.categoryProducts = action.payload?.data?.products || [];
      })
      .addCase(getCategoryProducts.rejected, (state, action) => {
        state.userCategoryProducts = false;
        state.userCategoryProductsError =
          action.payload || "Failed to fetch user products";
      });

    builder
      .addCase(getUserProducts.pending, (state) => {
        state.loadingUserProducts = true;
        state.errorUserProducts = null;
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        state.loadingUserProducts = false;
        state.userProducts = action.payload?.data?.products || [];
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.loadingUserProducts = false;
        state.errorUserProducts =
          action.payload || "Failed to fetch user products";
      });

    builder
      .addCase(getSingleProduct.pending, (state) => {
        state.loadingSingle = true;
        state.errorSingle = null;
      })
      .addCase(getSingleProduct.fulfilled, (state, action) => {
        state.loadingSingle = false;
        state.singleProduct = action.payload?.data || null;
      })
      .addCase(getSingleProduct.rejected, (state, action) => {
        state.loadingSingle = false;
        state.errorSingle = action.payload || "Failed to fetch product";
      });

    builder
      .addCase(getBestSellers.pending, (state) => {
        state.loadingBestSellers = true;
        state.errorBestSellers = null;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.loadingBestSellers = false;
        state.bestSellers = action.payload?.data?.bestSellers || [];
      })
      .addCase(getBestSellers.rejected, (state, action) => {
        state.loadingBestSellers = false;
        state.errorBestSellers =
          action.payload || "Failed to fetch best sellers";
      });

    builder
      .addCase(addProductReview.pending, (state) => {
        state.loadingReviewAction = true;
        state.errorReviewAction = null;
        state.successReviewAction = false;
      })
      .addCase(addProductReview.fulfilled, (state) => {
        state.loadingReviewAction = false;
        state.successReviewAction = true;
      })
      .addCase(addProductReview.rejected, (state, action) => {
        state.loadingReviewAction = false;
        state.errorReviewAction = action.payload || "Failed to add review";
      })

      .addCase(editProductReview.pending, (state) => {
        state.loadingReviewAction = true;
        state.errorReviewAction = null;
        state.successReviewAction = false;
      })
      .addCase(editProductReview.fulfilled, (state) => {
        state.loadingReviewAction = false;
        state.successReviewAction = true;
      })
      .addCase(editProductReview.rejected, (state, action) => {
        state.loadingReviewAction = false;
        state.errorReviewAction = action.payload || "Failed to edit review";
      })

      .addCase(deleteProductReview.pending, (state) => {
        state.loadingReviewAction = true;
        state.errorReviewAction = null;
        state.successReviewAction = false;
      })
      .addCase(deleteProductReview.fulfilled, (state) => {
        state.loadingReviewAction = false;
        state.successReviewAction = true;
      })
      .addCase(deleteProductReview.rejected, (state, action) => {
        state.loadingReviewAction = false;
        state.errorReviewAction = action.payload || "Failed to delete review";
      });
  },
});

export const { clearProductErrors, clearReviewSuccess, clearSingleProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
