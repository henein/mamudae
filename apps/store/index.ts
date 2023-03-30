import { combineReducers } from "@reduxjs/toolkit";
import darkModeReducer from "./darkmodeSlice/darkmode";
const rootReducer = combineReducers({
  darkMode: darkModeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
