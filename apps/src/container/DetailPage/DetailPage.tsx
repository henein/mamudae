import React from "react";
import styled from "styled-components";
import Login from "../../components/Login";
import { customColor } from "../../constants/customColor";
import Title from "./components/Title";
import Like from "./components/Like";

const DetailPage = () => {
  return (
    <Container>

      <WriteBox>
        <Title />
        <Content>
          슬퍼하는 이름을 나의 까닭입니다. 이런 어머님, 묻힌 아직 추억과 다
          별에도 오면 거외다. 비둘기, 이름자 파란 멀리 하나에 위에 있습니다.
          어머님, 했던 쉬이 이국 토끼, 불러 있습니다. 된 동경과 가난한 하나에 내
          그리워 언덕 까닭입니다. 하나에 옥 별을 시인의 있습니다. 하늘에는 별
          가을 계절이 당신은 봅니다. 아스라히 이런 라이너 까닭입니다. 하나에 별
          시인의 자랑처럼 패, 이제 아스라히 된 거외다. 가난한 우는 강아지, 봄이
          아이들의 버리었습니다. 지나고 많은 된 까닭이요, 내 무덤 까닭입니다.
          벌레는 불러 경, 오는 이름을 봅니다. 없이 하나에 멀리 이름과, 많은
          계십니다. 어머니, 언덕 별 내 버리었습니다. 프랑시스 이름자를 자랑처럼
          무성할 강아지, 무엇인지 버리었습니다. 멀듯이, 아이들의 하나에 이제
          내일 어머니, 못 노루, 계십니다. 별 멀리 비둘기, 있습니다. 차 별 청춘이
          별들을 내린 이웃 나는 버리었습니다. 오면 내 이름자 강아지, 하나에
          위에도 나는 패, 보고, 계십니다. 릴케 풀이 까닭이요, 위에 아침이 하나의
          별 가슴속에 새겨지는 거외다. 북간도에 별 이네들은 다하지 하나에 아무
          있습니다. 별 시인의 별들을 별 다하지 하나에 사람들의 마디씩 나의
          봅니다. 하나 이름을 가을 헤는 그리워 아직 봅니다. 다 불러 속의 우는
          버리었습니다. 풀이 위에 오는 어머니, 멀리 어머니, 속의 별 계십니다.
          어머니, 말 아무 묻힌 봅니다. 많은 오는 풀이 벌써 북간도에 계십니다.
          같이 많은 위에 당신은 아직 말 있습니다. 위에 까닭이요, 마리아 속의
          위에도 오는 이네들은 시와 듯합니다. 별들을 책상을 별 계집애들의 별빛이
          이름자 이제 벌레는 버리었습니다. 위에도 까닭이요, 봄이 하나에 다하지
          까닭입니다. 별 다 이웃 된 않은 듯합니다. 이제 이름자를 별 보고,
          아이들의 소녀들의 계집애들의 가득 이름을 까닭입니다. 계절이 이웃
          아이들의 청춘이 이름과, 밤이 소녀들의 까닭입니다. 시인의 멀리 멀리
          위에 아침이 마리아 이름과 이름을 있습니다. 아이들의 했던 쉬이 나의
          이국 별 이름자를 써 시인의 까닭입니다. 어머니, 하나에 지나가는 봄이
          계절이 많은 그리고 오면 이름자를 있습니다. 어머니, 지나고 잠, 아무
          멀리 이런 아이들의 걱정도 봅니다. 어머니 이제 않은 무덤 내 어머님,
          릴케 벌레는 있습니다. 하나에 가슴속에 묻힌 피어나듯이 듯합니다. 별
          헤는 별 덮어 아이들의 묻힌 봅니다. 이런 별빛이 보고, 이름을 아스라히
          비둘기, 이름자를 까닭입니다. 소학교 내린 속의 내 가슴속에 까닭입니다.
          않은 하나에 옥 사람들의 쓸쓸함과 별들을 걱정도 둘 까닭입니다. 별에도
          나는 프랑시스 가난한 봅니다. 하나 마리아 잔디가 지나가는 헤일 청춘이
          듯합니다. 가난한 새워 별 자랑처럼 멀리 둘 토끼, 잔디가 있습니다.
          소학교 벌써 별 슬퍼하는 지나가는 까닭입니다. 이름과 가난한 라이너
          아스라히 있습니다/
          <br />
          <br />
          <br />
        </Content>
        <Like />
      </WriteBox>

      <SideBox>
        <Login />
      </SideBox>
      <CommentBox></CommentBox>
    </Container>
  );
};

export default DetailPage;
const Content = styled.div`
  padding: 0 24px;
  margin-top: 20px;
  overflow-y: scroll;
  font-size: 16px;
  ::-webkit-scrollbar {
    display: none;
  }
  height: 530px;
`;

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentBox = styled.div`
  width: 808px;
  background-color: red;
`;
const WriteBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 748px;
  width: 808px;
  border: 1px solid ${customColor.whiteGray};
  border-radius: 32px;
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
