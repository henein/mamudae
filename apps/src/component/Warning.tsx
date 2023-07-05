import React from "react";
import Button from "./Button";
import SvgIcon from "@mui/material/SvgIcon";
import WarningIcon from "@mui/icons-material/Warning";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { offWarnings } from "../../store/warningSlice/onWarning";
import {
  useDelComment,
  useDelReComment,
} from "../hooks/detailPageHooks/useComment";

interface WarningProps {
  type: "modify" | "delete" | "report";
}

const Warning = ({ type }: WarningProps) => {
  const dispatch = useDispatch();

  const modalOff = () => {
    dispatch(offWarnings());
  };
  const submitData = () => {
    alert("submit");
  };

  // const { delComments } = useDelComment(del); // 댓글 del api
  // const { delReComments } = useDelReComment(redel); // 댓글 del api

  const korean = {
    modify: "수정",
    delete: "삭제",
    report: "신고",
  };
  return (
    <View isWarning>
      <Container isWarning>
        <Content>
          <ImgDiv>
            <SvgIcon component={WarningIcon} fontSize="small" />
          </ImgDiv>
          <Phrases>정말로 이 댓글을 {korean[type]}하시겠습니까?</Phrases>
        </Content>
        <BtnList>
          <div onClick={modalOff}>
            <Button type="button" sort="secondary">
              취소
            </Button>
          </div>
          <div onClick={submitData}>
            <Button type="submit" sort="danger">
              {korean[type]}하기
            </Button>
          </div>
        </BtnList>
      </Container>
    </View>
  );
};

export default Warning;

const View = styled.div<{ isWarning: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.modalBackdrop};
`;
const Container = styled.div<{ isWarning: boolean }>`
  display: ${({ isWarning }) => (isWarning ? "flex" : "none")};
  width: 380px;
  flex-direction: column;
  justify-content: center;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.border};
  box-shadow: 0px 4px 8px 0px ${({ theme }) => theme.boxShadow};
  position: sticky;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
