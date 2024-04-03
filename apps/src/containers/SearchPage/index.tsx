import React from "react";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Login from "../../component/LoginComponent/Login";
import SearchHeader from "./components/SearchHeader";
import SearchContent from "./components/SearchContent";

const SearchPage = ({ ...props }) => {
  return (
    <Layout>
      <Announcement />
      <SearchPageSet>
        <Aside>
          <Login />
        </Aside>
        <InnerContent>
          <SearchHeader />
          <SearchContent
            type={props.type}
            value={props.value}
            page={props.page}
          />
        </InnerContent>
      </SearchPageSet>
    </Layout>
  );
};

export default SearchPage;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 1140px;
  margin: 0 auto;
`;
const SearchPageSet = styled.div`
  display: flex;
  gap: 32px;
`;
const InnerContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 808px;
  gap: 24px;
`;
const Aside = styled.aside`
  display: flex;
  width: 300px;
`;
