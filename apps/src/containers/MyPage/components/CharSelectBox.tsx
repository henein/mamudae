import Image from "next/image";
import styled from "styled-components";
import Button from "../../../component/Button";
import { customColor } from "../../../constants/customColor";

const CharSelectBox = () => {
  return (
    <>
      <BoxContent>
        <Title>캐릭터</Title>
        <BoxLayout>
          <CharBox>
            <Image
              src="/myPageImages/character1.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
          <CharBox>
            <Image
              src="/myPageImages/character2.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
          <CharBox>
            <Image
              src="/myPageImages/character2.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
          <CharBox>
            <Image
              src="/myPageImages/character2.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
          <CharBox>
            <Image
              src="/myPageImages/character2.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
          <CharBox>
            <Image
              src="/myPageImages/character2.svg"
              width={120}
              height={120}
              alt=""
            />
          </CharBox>
        </BoxLayout>
        <Buttons>
          <AddBtn type="submit" sort="secondary">
            추가하기
          </AddBtn>
          <SaveBtn type="submit" sort="primary">
            저장하기
          </SaveBtn>
        </Buttons>
      </BoxContent>
    </>
  );
};
export default CharSelectBox;

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
  gap: 16px;
  overflow: hidden;
`;
const CharBox = styled.div`
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
  width: 120px;
  height: 120px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;
const AddBtn = styled(Button)``;
const SaveBtn = styled(Button)``;
