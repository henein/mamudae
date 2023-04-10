import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../component/Button";
import { customColor } from "../../constants/customColor";
import { FormInputCss } from "../LoginPage/components/Login";
import Editor from "./components/Editor";
import Image from "next/image";
import line from "/public/writingPageImages/Line.png";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateBoard } from "../../hooks/writingPageHooks/useCreateBoard";

const WritingPage = () => {
  const [value, setValue] = useState("");
  const { register, handleSubmit } = useForm();
  const { mutate } = useCreateBoard();

  const submit = (data: FieldValues) => {
    console.log(value);
    console.log(data);
    if (value !== "") {
      mutate({
        title: data["title"],
        boardType: data["selectBoard"],
        text: value,
        name: "임송재", // 로컬스토리지에 저장한 닉네임넣기
      });
    }
  };

  const handleChange = (value: any) => {
    setValue(value);
    console.log(value);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <TitleBox>
        <SelectBoard {...register("selectBoard", { required: true })}>
          <option value="F">자유</option>
          <option value="I">정보</option>
          <option>유머</option>
        </SelectBoard>

        <Line src={line} alt="none" />
        <Title
          placeholder="제목"
          type="text"
          {...register("title", { required: true })}
        />
      </TitleBox>

      <EditorBox>
        <Editor value={value} onChange={handleChange} />
      </EditorBox>
      <ButtonBox>
        <Button sort="sub" width="81px" height="41px">
          저장하기
        </Button>
        <Button sort="sub" width="81px" height="41px">
          불러오기
        </Button>
        <Button type="submit" sort="main" width="81px" height="41px">
          등록하기
        </Button>
      </ButtonBox>
    </form>
  );
};

export default WritingPage;

const Line = styled(Image)`
  margin: auto 29px;
  z-index: 1;
`;

const SelectBoard = styled.select`
  position: relative;
  left: 16px;
  border: none;
  background-color: transparent;
  outline: none;
  z-index: 1;
`;

const Form = styled.form``;

const TitleBox = styled.div`
  width: 1140px;
  height: 59px;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  position: relative;
  z-index: 1;
  align-items: center;
`;

const Title = styled.input`
  ${FormInputCss}
  height: 100%;
  padding: 0 0 0 101px;
  border-radius: 16px;
  position: absolute;
  line-height: 100%;
`;

const ButtonBox = styled.div`
  display: flex;
  width: 1140px;
  margin: 0 auto;
  justify-content: end;
  gap: 8px;
`;

const EditorBox = styled.div`
  height: 678px;
  position: relative;
  width: 1140px;
  margin: 20px auto;
  border-radius: 24px;
  border: 1px solid ${customColor.whiteGray};
`;
