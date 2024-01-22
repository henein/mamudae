import React from "react";
import styled from "styled-components";
import { usePostRecommend } from "../../../hooks/detailPageHooks/usePostRecommend";
import FavoriteBorderOutlinedIcon from "/public/detailPageImages/favoriteOutline.svg";
import Favorite from "/public/detailPageImages/favorite.svg";
interface ILikeIcon {
  boardId: string;
  recommended: boolean;
}

const LikeIcon = ({ boardId, recommended }: ILikeIcon) => {
  const { recommend } = usePostRecommend({ boardId });

  const onLikeClick = () => {
    recommend();
  };
  return (
    <>
      <IconDiv onClick={onLikeClick} recommended={recommended}>
        {recommended ? (
          <Favorite width="20px" height="20px" />
        ) : (
          <FavoriteBorderOutlinedIcon width="20px" height="20px" />
        )}
      </IconDiv>
    </>
  );
};

export default LikeIcon;

const IconDiv = styled.div<{ recommended: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, recommended }) =>
    recommended ? theme.brand : theme.card};
  color: ${({ theme, recommended }) => (recommended ? "white" : theme.brand)};
  border: 1px solid ${({ theme }) => theme.border};
  width: 40px;
  height: 40px;
  border-radius: 64px;
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
  }
`;
