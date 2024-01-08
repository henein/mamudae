import { combineReducers } from "@reduxjs/toolkit";
import darkModeReducer from "./darkmodeSlice/darkmode";
import onWarningReducer from "./warningSlice/onWarning";
import userInfoReducer from "./userInfoSlice/userInfo";
import commentInfoReducer from "./warningSlice/commentInfo";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root", // localStorage key
  storage, // localStorage
  whitelist: ["darkMode"], // target (reducer name)
};

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  onWarning: onWarningReducer,
  userInfo: userInfoReducer,
  commentInfoSet: commentInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
