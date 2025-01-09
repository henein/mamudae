import { create } from 'zustand';

export interface CommentInfo {
  boardId: number;
  comment: string;
  commentId: number;
  isMyComment: boolean;
  isRecomment: boolean;
  replyId?: number;
  tag?: string;
}

interface Prop {
  commentInfo: CommentInfo;
  setCommentInfo: (commentInfo: CommentInfo) => void;
}

const useCommentInfoState = create<Prop>((set) => ({
  commentInfo: {
    boardId: 0,
    comment: '',
    commentId: 0,
    isMyComment: false,
    isRecomment: false,
    replyId: 0,
    tag: '',
  },
  setCommentInfo: (commentInfo) => set(() => ({ commentInfo: commentInfo })),
}));

export default useCommentInfoState;
