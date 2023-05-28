import React, { useState } from "react";
import styled from "styled-components";
import { usePostRecommend } from "../../../hooks/detailPageHooks/usePostRecommend";
import { useLocalStorage } from "../../../hooks/storage/useLocalStorage";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Favorite from "@mui/icons-material/Favorite";
import SvgIcon from "@mui/material/SvgIcon";
interface ILikeIcon {
  id: string;
}

const LikeIcon = ({ id }: ILikeIcon) => {
  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");
  const { recommend } = usePostRecommend({ id, accessToken });

  const [isLikeClick, setIsLikeClick] = useState(false);

  const onLikeClick = () => {
    recommend();
    setIsLikeClick((curr) => !curr);
  };
  return (
    <>
      <IconDiv onClick={onLikeClick} isLikeClick={isLikeClick}>
        {isLikeClick ? (
          <SvgIcon component={Favorite} />
        ) : (
          <SvgIcon component={FavoriteBorderOutlinedIcon} />
        )}
      </IconDiv>
    </>
  );
};

export default LikeIcon;

const IconDiv = styled.div<{ isLikeClick: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, isLikeClick }) =>
    isLikeClick ? theme.Brand : theme.card};
  color: ${({ theme, isLikeClick }) => (isLikeClick ? "white" : theme.Brand)};
  border: 1px solid ${({ theme }) => theme.border};
  width: 40px;
  height: 40px;
  border-radius: 64px;
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
  }
`;
