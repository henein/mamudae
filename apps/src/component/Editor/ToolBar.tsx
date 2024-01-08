import Attachment from "/public/writingPageImages/attachment.svg";
import FormatAlignCenter from "/public/writingPageImages/formatAlignCenter.svg";
import FormatAlignJustify from "/public/writingPageImages/formatAlignJustify.svg";
import FormatAlignLeft from "/public/writingPageImages/formatAlignLeft.svg";
import FormatAlignRight from "/public/writingPageImages/formatAlignRight.svg";
import FormatBold from "/public/writingPageImages/formatBold.svg";
import FormatItalic from "/public/writingPageImages/formatItalic.svg";
import FormatStrikethrough from "/public/writingPageImages/formatStrikethrough.svg";
import FormatUnderlined from "/public/writingPageImages/formatUnderlined.svg";
import ImageIcon from "/public/writingPageImages/imageIcon.svg";
import { Editor } from "@tiptap/react";
import React from "react";
import styled from "styled-components";
import { ToolBarButton } from "./ToolBarButton";
import { ToolBarDivider } from "./ToolBarDivider";
import FormatH1 from "/public/writingPageImages/format_h1.svg";
import FormatH2 from "/public/writingPageImages/format_h2.svg";
import FormatH3 from "/public/writingPageImages/format_h3.svg";
import useScroll from "../../hooks/scrollHooks/useScroll";
import { CardHeader } from "../CardHeader";
import { useLocalStorage } from "../../hooks/storage/useLocalStorage";
import { uploadImage } from "../../api/board";

export interface ToolBarProps {
  editor: Editor | null;
}

export const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  const { isScrollDown } = useScroll();

  const { getLocalStorage } = useLocalStorage();
  const accessToken = getLocalStorage("access");

  return (
    <Container isScrollDown={isScrollDown}>
      <ToolBarButton
        isChecked={editor?.isActive("heading", { level: 1 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <FormatH1 />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive("heading", { level: 2 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <FormatH2 />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive("heading", { level: 3 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <FormatH3 />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive("bold")}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FormatBold />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive("italic")}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FormatItalic />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive("underline")}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlined />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive("strike")}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <FormatStrikethrough />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: "left" })}
        onClick={() => editor?.chain().focus().setTextAlign("left").run()}
      >
        <FormatAlignLeft />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: "center" })}
        onClick={() => editor?.chain().focus().setTextAlign("center").run()}
      >
        <FormatAlignCenter />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: "right" })}
        onClick={() => editor?.chain().focus().setTextAlign("right").run()}
      >
        <FormatAlignRight />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: "justify" })}
        onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
      >
        <FormatAlignJustify />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        onClick={() => {
          editor?.commands.focus();

          const input = document.createElement("input");

          input.type = "file";
          input.multiple = true;
          input.onchange = (_) => {
            if (!input.files) {
              return;
            }

            const files = Array.from(input.files);

            files.forEach(async (file) => {
              const url = await uploadImage({
                accessToken: accessToken,
                image: file,
              });
              editor?.chain().focus().setImage({ src: url }).run();
            });
          };
          input.click();
        }}
      >
        <ImageIcon />
      </ToolBarButton>
      <ToolBarButton onClick={() => editor?.chain().focus().run()}>
        <Attachment />
      </ToolBarButton>
    </Container>
  );
};

const Container = styled(CardHeader)<{ isScrollDown: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.text};
  padding: 8px 20px;
  position: sticky;
  top: ${({ isScrollDown }) => (isScrollDown ? "16px" : "88px")};
  z-index: 1;
  transition: top 0.2s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;
