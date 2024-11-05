import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage
import { baseApi } from "./api/baseApi";
import cartReducer from "./features/cartSlice";

// Redux Persist configuration for the cart slice
const persistConfig = {
  key: "cart",
  storage,
};

// Wrapping cart reducer with persistReducer
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: persistedCartReducer, // Use persisted cart reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
});

// Persistor for Redux Persist
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
