import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import localStorage from "redux-persist/es/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import logger from "redux-logger";
import { thunk } from "redux-thunk";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import authSlice from "./slices/auth-slice";
import messageSlice from "./slices/message-slice";
import storageSlice from "./slices/storage-slice";

import { apiSlice } from "./apis/api-slice";

import { LOCAL_STORAGE_TOKEN } from "./utils"; 

// reducers
const rootReducer = combineReducers({
  auth: authSlice,
  message: messageSlice,
  storage: storageSlice,

  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root-" + LOCAL_STORAGE_TOKEN,
  version: 1,
  storage: localStorage,
  whitelist: ["auth", "message", "storage", ], //whitelist means will be persisted.
  blocklist: [
    "apiSlice",
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      apiSlice.middleware,
      logger,
      thunk,
    ]),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);