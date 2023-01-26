import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Bottom>
      <div className='inlineBox'>
        <h1>Henein</h1>
        <span>© Gamza. All rights reserved</span>
      </div>
    </Bottom>
  );
};

export default Footer;

const Bottom = styled.div`
  background-color: #edebf2;
  height: 144px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  h1 {
    font-size: 24px;
    font-weight: 900;
    line-height: 29.05px;
    color: #5f5e61;
    margin-bottom: 4px;
  }
  span {
    font-weight: 400;
    font-size: 12px;
    line-height: 14.52px;
    color: #afadb2;
  }
  .inlineBox {
    display: flex;
    flex-direction: column;
    width: 1140px;
  }
`;
