import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type darkModeState = {
  isDarkMode: boolean;
};

const initialState: darkModeState = {
  isDarkMode: false,
};

const darkmode = createSlice({
  name: "darkmode",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleDarkMode } = darkmode.actions;
export default darkmode.reducer;
