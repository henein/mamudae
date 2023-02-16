import styled from "styled-components";
import TextRolling from "./TextRolling";

const Announce = () => {
  return (
    <Layout>
      <ContentBox>
        <ViewZone>
          <TextRolling />
        </ViewZone>
      </ContentBox>
    </Layout>
  );
};
export default Announce;

const Layout = styled.div`
  margin: 24px 0;
`;
const ContentBox = styled.div`
  width: 1140px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 32px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: white;
`;
const ViewZone = styled.div`
  margin-top: 20px;
  height: 24px;
  overflow: hidden;
`;
