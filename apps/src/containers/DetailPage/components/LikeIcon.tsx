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

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = () => {
    setIsMouseOver(true);
  };
  const handleMouseLeave = () => {
    setIsMouseOver(false);
  };
  return (
    <>
      <IconDiv
        onClick={recommend}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {isMouseOver ? (
          <SvgIcon component={Favorite} />
        ) : (
          <SvgIcon component={FavoriteBorderOutlinedIcon} />
        )}
      </IconDiv>
    </>
  );
};

export default LikeIcon;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.Brand};
  border: 1px solid ${({ theme }) => theme.border};
  width: 40px;
  height: 40px;
  border-radius: 64px;
  margin-bottom: 4px;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.Brand};
    color: white;
  }
`;
