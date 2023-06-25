import styled from "styled-components";
import Button from "../../../component/Button";
import Label from "../../../component/Label";
import { customColor } from "../../../constants/customColor";

const LabelSelectBox = () => {
  return (
    <>
      <BoxContent>
        <Title>라벨</Title>
        <BoxLayout>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="level">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="floor">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="job">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="job">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="level">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="floor">48층</Labels>
          </InnerBox>
          <InnerBox>
            <CheckBox type="checkbox" />
            <Labels type="job">48층</Labels>
          </InnerBox>
        </BoxLayout>
        <Buttons>
          <SaveBtn type="submit" sort="primary">
            저장하기
          </SaveBtn>
        </Buttons>
      </BoxContent>
    </>
  );
};
export default LabelSelectBox;

const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  padding: 20px 24px;
`;
const Title = styled.h3`
  width: 760px;
  height: 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;
const BoxLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const InnerBox = styled.div`
  display: flex;
  gap: 8px;
  height: 18px;
`;
const CheckBox = styled.input`
  appearance: none;
  border: 1px solid ${customColor.whiteGray} !important;
  margin: 0;
  width: 18px;
  border-radius: 4px;
  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: ${customColor.orange};
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const SaveBtn = styled(Button)``;
const Labels = styled(Label)``;
