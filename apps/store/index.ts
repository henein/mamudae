import { combineReducers } from "@reduxjs/toolkit";
import darkModeReducer from "./darkmodeSlice/darkmode";
import onWarningReducer from "./warningSlice/onWarning";
import userInfoReducer from "./userInfoSlice/userInfo";
import commentInfoReducer from "./warningSlice/commentInfo";
const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  onWarning: onWarningReducer,
  userInfo: userInfoReducer,
  commentInfoSet: commentInfoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
