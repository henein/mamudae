import {
  Attachment,
  FormatAlignCenter,
  FormatAlignJustify,
  FormatAlignLeft,
  FormatAlignRight,
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  FormatUnderlined,
  Image as ImageIcon,
} from '@mui/icons-material';
import { Editor } from '@tiptap/react';
import React from 'react';
import styled from 'styled-components';
import { CardHeader } from '../../../component/CardHeader';
import useScroll from '../../../hooks/scrollHooks/useScroll';
import { ToolBarButton } from './ToolBarButton';
import { ToolBarDivider } from './ToolBarDivider';
import FormatH1 from './format_h1.svg';
import FormatH2 from './format_h2.svg';
import FormatH3 from './format_h3.svg';

export interface ToolBarProps {
  editor: Editor | null;
}

export const ToolBar: React.FC<ToolBarProps> = ({ editor }) => {
  const { isScrollDown } = useScroll();

  return (
    <Container isScrollDown={isScrollDown}>
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 1 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <FormatH1 />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 2 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <FormatH2 />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('heading', { level: 3 })}
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
      >
        <FormatH3 />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive('bold')}
        onClick={() => editor?.chain().focus().toggleBold().run()}
      >
        <FormatBold fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('italic')}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
      >
        <FormatItalic fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('underline')}
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
      >
        <FormatUnderlined fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive('strike')}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
      >
        <FormatStrikethrough fontSize="small" />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'left' })}
        onClick={() => editor?.chain().focus().setTextAlign('left').run()}
      >
        <FormatAlignLeft fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'center' })}
        onClick={() => editor?.chain().focus().setTextAlign('center').run()}
      >
        <FormatAlignCenter fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'right' })}
        onClick={() => editor?.chain().focus().setTextAlign('right').run()}
      >
        <FormatAlignRight fontSize="small" />
      </ToolBarButton>
      <ToolBarButton
        isChecked={editor?.isActive({ textAlign: 'justify' })}
        onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
      >
        <FormatAlignJustify fontSize="small" />
      </ToolBarButton>
      <ToolBarDivider />
      <ToolBarButton
        onClick={() => {
          editor?.commands.focus();

          const input = document.createElement('input');

          input.type = 'file';
          input.multiple = true;
          input.onchange = (_) => {
            if (!input.files) {
              return;
            }

            const files = Array.from(input.files);

            files.forEach((file) => {
              editor
                ?.chain()
                .focus()
                .setImage({ src: URL.createObjectURL(file) })
                .run();
            });
          };
          input.click();
        }}
      >
        <ImageIcon fontSize="small" />
      </ToolBarButton>
      <ToolBarButton onClick={() => editor?.chain().focus().run()}>
        <Attachment fontSize="small" />
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
  top: ${({ isScrollDown }) => (isScrollDown ? '16px' : '88px')};
  z-index: 1;
  transition: top 0.2s ease-in-out;

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;
