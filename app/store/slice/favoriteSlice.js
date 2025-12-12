import { FetchApi } from "@/app/api/FetchApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;

    try {
      const response = await FetchApi({
        endpoint: "/user/favorites",
        method: "GET",
        token,
      });

      if (response?.data?.success === false)
        return thunkAPI.rejectWithValue(response?.data?.errors);

      return response?.data;
    } catch (err) {
      let errorMessage = err?.message;
      try {
        errorMessage = JSON.parse(err.message)?.message || err.message;
      } catch {}
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const fetchGuestFavorites = createAsyncThunk(
  "favorites/fetchGuestFavorites",
  async (guestId, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;

    try {
      const response = await FetchApi({
        endpoint: `/guest/favorites/?guestId=${guestId}`,
        method: "GET",
        token,
      });

      if (response?.data?.success === false)
        return thunkAPI.rejectWithValue(response?.data?.errors);

      return response?.data;
    } catch (err) {
      let errorMessage = err?.message;
      try {
        errorMessage = JSON.parse(err.message)?.message || err.message;
      } catch {}
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/user/favorites/${payload?.productId}`,
        method: "POST",
        token,
        body: payload,
      });

      if (response?.data?.success === false)
        return thunkAPI.rejectWithValue(response?.data?.errors);

      await thunkAPI.dispatch(fetchFavorites());
      return response?.data;
    } catch (err) {
      let errorMessage = err?.message;
      try {
        errorMessage = JSON.parse(err.message)?.message || err.message;
      } catch {}
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

export const addGuestFavorite = createAsyncThunk(
  "favorites/addGuestFavorite",
  async (payload, thunkAPI) => {
    const token = thunkAPI.getState()?.auth?.accessToken;
    try {
      const response = await FetchApi({
        endpoint: `/guest/favorites/${payload?.productId}`,
        method: "POST",
        token,
        body: payload,
      });

      if (response?.data?.success === false)
        return thunkAPI.rejectWithValue(response?.data?.errors);

      await thunkAPI.dispatch(fetchGuestFavorites(payload?.guestId));
      return response?.data;
    } catch (err) {
      let errorMessage = err?.message;
      try {
        errorMessage = JSON.parse(err.message)?.message || err.message;
      } catch {}
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: [],
    favoritesCount: null,
    loading: false,
    getLoading: false,
    addFavoriteMsg: null,
    addFavoriteError: null,
    message: null,
    error: null,
  },

  reducers: {
    clearFavoriteMessage: (state) => {
      state.message = null;
      state.error = null;
      state.addFavoriteMsg = null;
      state.addFavoriteError = null;

    },
    clearFavoritesState: (state) => {
      state.favorites = [];
      state.message = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.getLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.getLoading = false;
        state.favorites = action.payload?.favorites || [];
        state.favoritesCount = action?.payload?.total || 0;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.getLoading = false;
        state.error = action.payload || "Failed to fetch favorites";
      })

      .addCase(fetchGuestFavorites.pending, (state) => {
        state.getLoading = true;
        state.error = null;
      })
      .addCase(fetchGuestFavorites.fulfilled, (state, action) => {
        state.getLoading = false;
        state.favorites = action.payload?.favorites || [];
        state.favoritesCount = action?.payload?.total || 0;
      })
      .addCase(fetchGuestFavorites.rejected, (state, action) => {
        state.getLoading = false;
        state.error = action.payload || "Failed to fetch favorites";
      })

      .addCase(addFavorite.pending, (state) => {
        state.loading = true;
        state.addFavoriteError = null;
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.loading = false;
        state.addFavoriteMsg = action.payload?.message;
      })
      .addCase(addFavorite.rejected, (state, action) => {
        state.loading = false;
        state.addFavoriteError = action.payload || "Failed to add favorite";
      });
  },
});

export const { clearFavoriteMessage, clearFavoritesState } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
