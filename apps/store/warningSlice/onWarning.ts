import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type warningState = {
  isWarning: boolean;
  warningType: "delete" | "modify" | "report" | "cubeCheck";
};

const initialState: warningState = {
  isWarning: false,
  warningType: "delete",
};

const warningSlice = createSlice({
  name: "isWarning",
  initialState,
  reducers: {
    onWarnings: (state, action) => {
      state.isWarning = true;
      state.warningType = action.payload;
    },
    offWarnings: (state) => {
      state.isWarning = false;
    },
  },
});

export const { onWarnings, offWarnings } = warningSlice.actions;
export default warningSlice.reducer;
