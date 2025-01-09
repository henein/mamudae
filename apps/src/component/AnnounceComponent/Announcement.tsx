import styled from 'styled-components';
import TextRolling from './TextRolling';

const Announcement = () => {
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
export default Announcement;

const Layout = styled.div`
  margin: 24px 0px;
`;
const ContentBox = styled.div`
  height: 40px;
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  box-sizing: border-box;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.card};
  max-width: 1140px;
`;
const ViewZone = styled.div`
  margin: 8px 0;
  height: 24px;
  overflow: hidden;
`;
