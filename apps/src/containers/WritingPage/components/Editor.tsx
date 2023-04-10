import React, { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styled from "styled-components";
import { customColor } from "../../../constants/customColor";
import { FormInputCss } from "../../LoginPage/components/Login";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

const Editor = ({ value, onChange }: EditorProps) => {
  const [editorHtml, setEditorHtml] = useState(value);

  const handleChange = (html: string) => {
    setEditorHtml(html);
    onChange(html);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <Wrapper>
      <CustomReactQuill
        value={editorHtml}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </Wrapper>
  );
};

export default Editor;
const CustomReactQuill = styled(ReactQuill)`
  height: 100%;
  .ql-toolbar {
    padding: 8px 20px;
    box-shadow: 0 2px 4px ${customColor.shadow};
    width: 100%;
    height: 48px;
    margin: 0 auto;
    z-index: 1;
    border-radius: 32px;
    border: none;
    display: flex;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    position: sticky;
    background-color: ${customColor.white};
  }
  .ql-container {
    height: calc(100% - 48px);
    border: none;
    padding: 20px 40px;
  }
  .ql-editor {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
`;
