import React, { useState } from "react";
import Button from "./Button";
import SvgIcon from "@mui/material/SvgIcon";
import WarningIcon from "@mui/icons-material/Warning";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { offWarnings } from "../../store/warningSlice/onWarning";
import { useDeleteForm } from "../hooks/detailPageHooks/useCommentForm";
import useCommentInfoSet from "../hooks/reduxHooks/useCommentInfoSet";
import DateSelector from "./DateSelector";
interface WarningProps {
  type: "modify" | "delete" | "report" | "cubeCheck";
  mutate?: any;
}

const Warning = ({ type, mutate }: WarningProps) => {
  const dispatch = useDispatch();

  const commentInfo = useCommentInfoSet();
  const { deleteLogic } = useDeleteForm(commentInfo);

  const modalOff = () => {
    dispatch(offWarnings());
  };
  const submitData = async () => {
    if (type == "delete") {
      await deleteLogic();
      await modalOff();
    }
  };

  const [pastDay, setPastDay] = useState<string>("");
  const [recentDay, setRecentDay] = useState<string>("");

  const korean = {
    modify: "수정",
    delete: "삭제",
    report: "신고",
    cubeCheck: "큐브 내역 조회",
  };
  return (
    <View isWarning>
      <Container isWarning>
        <Content>
          {type !== "cubeCheck" && (
            <ImgDiv>
              <SvgIcon component={WarningIcon} fontSize="small" />
            </ImgDiv>
          )}
          {type == "cubeCheck" ? (
            <>
              <Phrases>{korean[type]}기간을 입력해주세요.</Phrases>
              <DateSelector
                setPastDay={setPastDay}
                setRecentDay={setRecentDay}
              />
            </>
          ) : (
            <Phrases>정말로 이 댓글을 {korean[type]}하시겠습니까?</Phrases>
          )}
        </Content>
        <BtnList>
          <Button type="button" sort="secondary" onClick={() => modalOff()}>
            취소
          </Button>
          {type == "cubeCheck" ? (
            <Button
              type="submit"
              sort="primary"
              onClick={async () => {
                if (pastDay && recentDay) {
                  await mutate({ recentDay: recentDay, pastDay: pastDay });
                  await modalOff();
                } else {
                  alert("날짜를 선택해주세요");
                }
              }}
            >
              인증하기
            </Button>
          ) : (
            <Button type="submit" sort="danger" onClick={() => submitData()}>
              {korean[type]}하기
            </Button>
          )}
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
  backdrop-filter: blur(4px);
`;
