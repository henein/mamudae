import { createSlice } from "@reduxjs/toolkit";

type infoType = {
  commentInfo: {
    boardId: string;
    comment: string;
    commentId: string;
    isMyComment: boolean;
    isRecomment: boolean;
    tag?: string;
  };
};

const initialState: infoType = {
  commentInfo: {
    boardId: "",
    comment: "",
    commentId: "",
    isMyComment: false,
    isRecomment: false,
    tag: "",
  },
};

const commentInfo = createSlice({
  name: "isWarning",
  initialState,
  reducers: {
    commentInfoSet: (state, action) => {
      state.commentInfo = action.payload;
    },
  },
});

export const { commentInfoSet } = commentInfo.actions;
export default commentInfo.reducer;
