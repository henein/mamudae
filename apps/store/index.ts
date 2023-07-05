import { combineReducers } from "@reduxjs/toolkit";
import darkModeReducer from "./darkmodeSlice/darkmode";
import onWarningReducer from "./warningSlice/onWarning";

const rootReducer = combineReducers({
  darkMode: darkModeReducer,
  onWarning: onWarningReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
