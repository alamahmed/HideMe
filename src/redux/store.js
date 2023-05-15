import { configureStore } from "@reduxjs/toolkit";
import persistedRootReducer from "./rootReducer";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: persistedRootReducer,
});
export default store;
export const persistor = persistStore(store);
