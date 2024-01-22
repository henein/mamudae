import React from "react";
import {
  View,
  Container,
  Content,
  Phrases,
  BtnList,
  ImgDiv,
} from "./warningStyle";
import WarningIcon from "/public/detailPageImages/warning.svg";
import Button from "../Button";
import { WarningProps } from "./CommentWarning";
import { useDispatch } from "react-redux";
import { offWarnings } from "../../../store/warningSlice/onWarning";
import { useBoardDelete } from "../../hooks/detailPageHooks/useDetail";

interface BoardWarningProps extends WarningProps {
  boardId: number;
}
const BoardWarning = ({ type, boardId }: BoardWarningProps) => {
  const dispatch = useDispatch();
  const { boardDelete } = useBoardDelete({ boardType: "", boardId });

  const submitData = async () => {
    if (type === "report") {
      alert("신고 기능은 미구현입니다.");
      dispatch(offWarnings());
    } else if (type == "delete") {
      await boardDelete();
      dispatch(offWarnings());
    }
  };
  const korean = {
    modify: "수정",
    delete: "삭제",
    report: "신고",
    cube: null,
  };

  return (
    <View isWarning>
      <Container isWarning>
        <Content>
          <ImgDiv>
            <WarningIcon width="22px" height="19px" />
          </ImgDiv>
          <Phrases>정말로 이 게시글을 {korean[type]}하시겠습니까?</Phrases>
        </Content>
        <BtnList>
          <Button
            type="button"
            sort="secondary"
            onClick={() => dispatch(offWarnings())}
          >
            취소
          </Button>
          <Button type="submit" sort="danger" onClick={() => submitData()}>
            {korean[type]}하기
          </Button>
        </BtnList>
      </Container>
    </View>
  );
};

export default BoardWarning;
