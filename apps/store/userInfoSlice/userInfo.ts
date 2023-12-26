import { createSlice } from "@reduxjs/toolkit";

interface userInfoType {
  userName: string;
  userRole: string;
}

const initialState: userInfoType = {
  userName: "",
  userRole: "",
};

const userInfoSlice = createSlice({
  name: "loginUserInfo",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      const { userName, userRole } = action.payload;
      state.userName = userName;
      state.userRole = userRole;
    },
  },
});

export const { saveUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
