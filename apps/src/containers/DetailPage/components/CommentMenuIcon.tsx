import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import CommentTools from "./CommentTools";
import MoreButton from "/public/detailPageImages/more_button.svg";

export interface CommentMenuProps {
  boardId: string;
  comment: string;
  commentId: string;
  isMine: boolean;
  replyId?: string;
  tag?: string;
  isRecomment: boolean;
  setIsModifyClick: Dispatch<SetStateAction<boolean>>;
}
const CommentMenuIcon = ({ setIsModifyClick, ...props }: CommentMenuProps) => {
  const [isHover, setIsHover] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  return (
    <Wrap
      onFocus={() => setIsHover(true)}
      onBlur={() => {
        setIsToggle(false);
        setIsHover(false);
      }}
      onClick={() => setIsToggle((prev) => !prev)}
      tabIndex={0}
    >
      <MoreButton width="6px" height="12px" />
      {isHover && isToggle && (
        <CommentTools
          boardId={props.boardId}
          commentId={props.commentId}
          isMine={props.isMine}
          commentInfo={props}
          setIsHover={setIsHover}
          setIsModifyClick={setIsModifyClick}
        />
      )}
    </Wrap>
  );
};

export default CommentMenuIcon;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.subText};
  &:hover {
    cursor: pointer;
  }
`;
