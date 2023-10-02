import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import CommentTools from "./CommentTools";

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
      <Svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_425_868"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_425_868)">
          <path
            d="M10 16C9.58333 16 9.22933 15.854 8.938 15.562C8.646 15.2707 8.5 14.9167 8.5 14.5C8.5 14.0833 8.646 13.7293 8.938 13.438C9.22933 13.146 9.58333 13 10 13C10.4167 13 10.7707 13.146 11.062 13.438C11.354 13.7293 11.5 14.0833 11.5 14.5C11.5 14.9167 11.354 15.2707 11.062 15.562C10.7707 15.854 10.4167 16 10 16ZM10 11.5C9.58333 11.5 9.22933 11.354 8.938 11.062C8.646 10.7707 8.5 10.4167 8.5 10C8.5 9.58333 8.646 9.22933 8.938 8.938C9.22933 8.646 9.58333 8.5 10 8.5C10.4167 8.5 10.7707 8.646 11.062 8.938C11.354 9.22933 11.5 9.58333 11.5 10C11.5 10.4167 11.354 10.7707 11.062 11.062C10.7707 11.354 10.4167 11.5 10 11.5ZM10 7C9.58333 7 9.22933 6.854 8.938 6.562C8.646 6.27067 8.5 5.91667 8.5 5.5C8.5 5.08333 8.646 4.72933 8.938 4.438C9.22933 4.146 9.58333 4 10 4C10.4167 4 10.7707 4.146 11.062 4.438C11.354 4.72933 11.5 5.08333 11.5 5.5C11.5 5.91667 11.354 6.27067 11.062 6.562C10.7707 6.854 10.4167 7 10 7Z"
            fill="#757575"
          />
        </g>
      </Svg>
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
  position: relative;
  z-index: 1;
`;
const Svg = styled.svg`
  &:hover {
    cursor: pointer;
  }
`;
