import React, { useState } from "react";
import styled from "styled-components";
import { usePostRecommend } from "../../../hooks/detailPageHooks/usePostRecommend";
import { useLocalStorage } from "../../../hooks/storage/useLocalStorage";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import SvgIcon from "@mui/material/SvgIcon";
interface ILikeIcon {
  boardId: string;
  recommended: boolean;
}

const LikeIcon = ({ boardId, recommended }: ILikeIcon) => {
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");
  const { recommend } = usePostRecommend({ boardId, accessToken });

  const onLikeClick = () => {
    recommend();
  };
  return (
    <>
      <IconDiv onClick={onLikeClick} recommended={recommended}>
        {recommended ? (
          <SvgIcon component={Favorite} />
        ) : (
          <SvgIcon component={FavoriteBorderOutlinedIcon} />
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
    recommended ? theme.Brand : theme.card};
  color: ${({ theme, recommended }) => (recommended ? "white" : theme.Brand)};
  border: 1px solid ${({ theme }) => theme.border};
  width: 40px;
  height: 40px;
  border-radius: 64px;
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
  }
`;
