import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/reviews",
        method: "GET",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to fetch reviews"
      );
    }
  }
);

export const addReview = createAsyncThunk(
  "review/addReview",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: "/user/reviews/add",
        method: "POST",
        token,
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err?.message || "Failed to add review");
    }
  }
);

export const updateReview = createAsyncThunk(
  "review/updateReview",
  async ({ reviewId, payload }, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/reviews/update/${reviewId}`,
        method: "PUT",
        token,
        body: payload,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to update review"
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "review/deleteReview",
  async (reviewId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/reviews/delete/${reviewId}`,
        method: "DELETE",
        token,
      });
      return response?.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.message || "Failed to delete review"
      );
    }
  }
);

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewsData: [],
    addReviewData: null,
    updateReviewData: null,
    deleteReviewData: null,

    loadingFetch: false,
    loadingAdd: false,
    loadingUpdate: false,
    loadingDelete: false,

    successMsg: null,
    errorMsg: null,
  },

  reducers: {
    clearReviewMessage(state) {
      state.successMsg = null;
    },
    clearReviewError(state) {
      state.errorMsg = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loadingFetch = true;
        state.errorMsg = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.reviewsData = action.payload?.reviews || action.payload;
        state.successMsg = action.payload?.message || "Reviews fetched";
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loadingFetch = false;
        state.errorMsg = action.payload;
      })

      .addCase(addReview.pending, (state) => {
        state.loadingAdd = true;
        state.errorMsg = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loadingAdd = false;
        state.addReviewData = action.payload;
        state.successMsg = action.payload?.message || "Review added";
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loadingAdd = false;
        state.errorMsg = action.payload;
      })

      .addCase(updateReview.pending, (state) => {
        state.loadingUpdate = true;
        state.errorMsg = null;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        state.loadingUpdate = false;
        state.updateReviewData = action.payload;
        state.successMsg = action.payload?.message || "Review updated";
      })
      .addCase(updateReview.rejected, (state, action) => {
        state.loadingUpdate = false;
        state.errorMsg = action.payload;
      })

      .addCase(deleteReview.pending, (state) => {
        state.loadingDelete = true;
        state.errorMsg = null;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loadingDelete = false;
        state.deleteReviewData = action.payload;
        state.successMsg = action.payload?.message || "Review deleted";
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loadingDelete = false;
        state.errorMsg = action.payload;
      });
  },
});

export const { clearReviewMessage, clearReviewError } = reviewSlice.actions;
export default reviewSlice.reducer;
