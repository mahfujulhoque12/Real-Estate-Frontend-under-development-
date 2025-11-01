import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/redux/feature/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // ✅ correct spelling

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage, // ✅ not "stroage"
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // ✅ use persistedReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // ✅ required for redux-persist
    }),
  devTools: process.env.NODE_ENV !== "production", // ✅ enables Redux DevTools
});

export const persistor = persistStore(store);

// ✅ Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
