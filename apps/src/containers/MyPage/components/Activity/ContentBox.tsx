import React from "react";
import styled from "styled-components";
import { BoxContent, Title } from "../Character/CharSelectBox";
const ContentBox = () => {
  return (
    <Container>
      <Title>게시글</Title>
      {/* postPage에 userPostList, MoreInfoBtn을 공통 컴포넌트로 빼서 props로 각각 data와 data,refetch 를 props로 넘기게하여 여기에도 적용하기 */}
    </Container>
  );
};

export default ContentBox;

const Container = styled(BoxContent)`
  width: 100%;
`;
