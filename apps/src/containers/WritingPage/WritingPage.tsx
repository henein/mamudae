import React, { useState } from "react";
import styled from "styled-components";
import { customColor } from "../../constants/customColor";
import { FormInputCss } from "../LoginPage/components/Login";
import Editor from "./components/Editor";

const WritingPage = () => {
  const [value, setValue] = useState("");

  const handleChange = (value: any) => {
    setValue(value);
    console.log(value);
  };

  return (
    <Container>
      {/* <Form>
        <Title placeholder="제목" />
      </Form> */}
      <Editor value={value} onChange={handleChange} />
    </Container>
  );
};

export default WritingPage;

const Form = styled.form``;

const Title = styled.input` 
  ${FormInputCss}
  position: absolute;
  top: 0;
  z-index: 2;
`;


const Container = styled.div`
  position: relative;
  height: 678px;
  width: 1140px;
  margin: 20px auto;
  border-radius: 32px;
  border: 1px solid ${customColor.whiteGray};
`;
