import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import gallerySlice from "./slices/gallerySlice";
import pinSlice from "./slices/pin";
import passwordSlice from "./slices/password";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};
const rootReducer = combineReducers({
  galleryReducer: gallerySlice,
  pinReducer: pinSlice,
  passwordReducer: passwordSlice,
});
const persistedRootReducer = persistReducer(persistConfig, rootReducer);
export default persistedRootReducer;
