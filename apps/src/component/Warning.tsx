import React from "react";
import Button from "./Button";
import SvgIcon from "@mui/material/SvgIcon";
import WarningIcon from "@mui/icons-material/Warning";
import styled from "styled-components";

const Warning = () => {
  return (
    <Container>
      <Content>
        <ImgDiv>
          <SvgIcon component={WarningIcon} fontSize="small" />
        </ImgDiv>
        <Phrases>정말로 이 댓글을 삭제하시겠습니까?</Phrases>
      </Content>
      <BtnList>
        <Button type="button" sort="secondary">
          취소
        </Button>
        <Button type="submit" sort="danger">
          삭제하기
        </Button>
      </BtnList>
    </Container>
  );
};

export default Warning;

const Container = styled.div`
  display: flex;
  width: 380px;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0px 4px 8px 0px ${({ theme }) => theme.boxShadow};
`;
const Content = styled.div`
  display: flex;
  padding: 20px 24px;
  flex-direction: column;
  gap: 16px;
  background-color: ${({ theme }) => theme.card};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
const ImgDiv = styled.div`
  color: ${({ theme }) => theme.danger};
`;
const Phrases = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
const BtnList = styled.ul`
  display: flex;
  padding: 16px 24px;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.cardHeader};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
