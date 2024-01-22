import React, { useState } from "react";
import Button from "../../../../component/Button";
import DateSelector from "./DateSelector";
import {
  View,
  Container,
  Content,
  Phrases,
  BtnList,
} from "../../../../component/WarningComponent/warningStyle";
import { useDispatch } from "react-redux";
import { offWarnings } from "../../../../../store/warningSlice/onWarning";

const DateSelectorBox = ({ mutate }: any) => {
  const [pastDay, setPastDay] = useState<string>("");
  const [recentDay, setRecentDay] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <View isWarning>
      <Container isWarning>
        <Content>
          <Phrases>큐브 사용 조회 기간을 입력해주세요.</Phrases>
          <DateSelector setPastDay={setPastDay} setRecentDay={setRecentDay} />
        </Content>
        <BtnList>
          <Button
            type="button"
            sort="secondary"
            onClick={() => dispatch(offWarnings())}
          >
            취소
          </Button>
          <Button
            type="submit"
            sort="primary"
            onClick={async () => {
              if (pastDay && recentDay) {
                await alert(
                  "사용자의 큐브 내역을 통해 캐릭터 닉네임을 조회합니다. (사용자 정보에 따라 시간차이가 발생할 수 있습니다.)"
                );
                await mutate({ recentDay: recentDay, pastDay: pastDay });
                await dispatch(offWarnings());
              } else {
                alert("날짜를 선택해주세요");
              }
            }}
          >
            인증하기
          </Button>
        </BtnList>
      </Container>
    </View>
  );
};

export default DateSelectorBox;
