import { create } from 'zustand';

export interface CommentInfo {
  boardId: string;
  comment: string;
  commentId: string;
  isMyComment: boolean;
  isRecomment: boolean;
  replyId?: string;
  tag?: string;
}

interface Prop {
  commentInfo: CommentInfo;
  setCommentInfo: (commentInfo: CommentInfo) => void;
}

const useCommentInfoState = create<Prop>((set) => ({
  commentInfo: {
    boardId: '',
    comment: '',
    commentId: '',
    isMyComment: false,
    isRecomment: false,
    replyId: '',
    tag: '',
  },
  setCommentInfo: (commentInfo) => set(() => ({ commentInfo: commentInfo })),
}));

export default useCommentInfoState;
