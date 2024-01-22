import { createSlice } from "@reduxjs/toolkit";

interface PayloadWarningState {
  isWarning: boolean;
  warningType: "delete" | "modify" | "report" | "cube";
  warningLocation: "board" | "comment" | "nexonAuth";
}

const initialState: PayloadWarningState = {
  isWarning: false,
  warningType: "delete",
  warningLocation: "board",
};

const warningSlice = createSlice({
  name: "isWarning",
  initialState,
  reducers: {
    onWarnings: (state, action) => {
      state.isWarning = true;
      state.warningType = action.payload.warningType;
      state.warningLocation = action.payload.warningLocation;
    },
    offWarnings: (state) => {
      state.isWarning = false;
    },
  },
});

export const { onWarnings, offWarnings } = warningSlice.actions;
export default warningSlice.reducer;
