import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
import { authReducer } from "@/store/slices/authSlice";
import { cartReducer } from "@/store/slices/cartSlice"; // Import the cart reducer

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

// Auth persistence configuration
const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["authState"],
};

// Cart persistence configuration
const cartPersistConfig = {
  key: "cart",
  storage: storage,
  whitelist: ["items"], // Persist the cart items
};

// Persisted reducers
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer); // Wrap the cart reducer

const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  cart: persistedCartReducer, // Use the persisted cart reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
