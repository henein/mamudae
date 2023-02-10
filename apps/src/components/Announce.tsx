import Image from "next/image";
import styled, { keyframes } from "styled-components";
import useArrRolling from "../hooks/useArrRolling";

const Announce = () => {
  const rollingArr = useArrRolling();

  return (
    <Layout>
      <ContentBox>
        <InnerUl>
          <InnerBox>
            {rollingArr.map((item) => {
              return (
                <TextSet key={item.id}>
                  <ImgDiv>
                    <Image
                      src='/campaign.svg'
                      width='20'
                      height='16'
                      alt='campaignimg'
                    />
                  </ImgDiv>
                  <InfoText>{item.text}</InfoText>
                </TextSet>
              );
            })}
          </InnerBox>
        </InnerUl>
      </ContentBox>
    </Layout>
  );
};

export default Announce;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1140px;
  height: 64px;
  border: 1px solid #e6e6e6;
  border-radius: 32px;
  box-sizing: border-box;
`;
const InnerUl = styled.ul`
  display: flex;
  flex-direction: column;
  height: 24px;
  overflow: hidden;
`;
const animation = keyframes`
  0% {
    transform: translateY(0px);
  }
  100%{
    transform: translateY(-24px);
  }
`;
const InnerBox = styled.div`
  animation: ${animation} 3s infinite;
`;
const TextSet = styled.li`
  display: flex;
  justify-content: center;
  line-height: 24px;
  position: relative;
`;
const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border: none;
  margin-right: 4px;
`;
const InfoText = styled.span`
  font-size: 20px;
  font-weight: 400;
`;
const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;
