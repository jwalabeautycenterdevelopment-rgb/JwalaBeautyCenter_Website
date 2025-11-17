import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistConfig } from "./rootConfig";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PERSIST,
  PURGE,
  PAUSE,
} from "redux-persist";
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor;
if (typeof window !== "undefined") {
  persistor = persistStore(store);
}
