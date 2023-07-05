import { createSlice } from "@reduxjs/toolkit";

type userInfoType = {
  userName: string;
  userUniquKey: string;
};

const initialState: userInfoType = {
  userName: "",
  userUniquKey: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    saveUserInfo: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export const { saveUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
