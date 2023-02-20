import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { customColor } from "../../../constants/customColor";

const MoreInfoBox = () => {
  return (
    <>
      <MoreInfo>
        <ExpandBtn>
          <Image
            src='/postPageImages/expand_more.svg'
            width='12'
            height='7'
            alt=''
          />
        </ExpandBtn>
      </MoreInfo>
    </>
  );
};

export default MoreInfoBox;

const MoreInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 24px;
  height: 64px;
  border-top: 1px solid ${customColor.whiteGray};
`;
const ExpandBtn = styled.button`
  width: 24px;
  height: 24px;
  background-color: ${customColor.white};
  border: none;
  &:hover {
    cursor: pointer;
  }
`;
