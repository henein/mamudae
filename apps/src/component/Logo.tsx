import React from "react";
import Mush from "../../public/LogoImages/mush.svg";
import H from "../../public/LogoImages/H.svg";
import E from "../../public/LogoImages/E.svg";
import N from "../../public/LogoImages/N.svg";
import I from "../../public/LogoImages/I.svg";
import styled from "styled-components";

interface LogoType {
  size: "small" | "big";
}
const Logo = ({ size }: LogoType) => {
  return (
    <Container>
      <div>
        <Mush
          width={size === "big" ? "116px" : "74px"}
          height={size === "big" ? "80px" : "49px"}
        />
      </div>
      <LogoText size={size}>
        <H
          width={size === "big" ? "50px" : "32px"}
          height={size === "big" ? "56px" : "35px"}
        />
        <E
          width={size === "big" ? "40px" : "25px"}
          height={size === "big" ? "56px" : "35px"}
        />
        <N
          width={size === "big" ? "50px" : "30px"}
          height={size === "big" ? "56px" : "35px"}
        />
        <E
          width={size === "big" ? "40px" : "25px"}
          height={size === "big" ? "56px" : "35px"}
        />
        <I
          width={size === "big" ? "16px" : "10px"}
          height={size === "big" ? "56px" : "35px"}
        />
        <N
          width={size === "big" ? "50px" : "30px"}
          height={size === "big" ? "56px" : "35px"}
        />
      </LogoText>
    </Container>
  );
};

export default Logo;
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 14px;
`;
const LogoText = styled.div<{ size: string }>`
  display: flex;
  gap: ${({ size }) => (size == "small" ? "4.5px" : "7.5px")};
`;
