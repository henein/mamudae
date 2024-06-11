import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Like from './Like';
import Title from './Title';
import { generateHTML } from '@tiptap/react';
import { extensions } from '../../../../component/Editor/Editor';

const WriteBox = ({ ...props }) => {
  const { data, boardId } = props;

  const [context, setContext] = useState('');
  useEffect(() => {
    if (data) {
      const html = generateHTML(JSON.parse(data.text), extensions);
      setContext(html);
    }
  }, [data]);
  return (
    <Container>
      <Wrapper>
        {data && (
          <>
            <Title
              title={data.title}
              name={data.userName}
              views={data.views}
              createTime={data.createTime}
            />
            <Content dangerouslySetInnerHTML={{ __html: context }} />
            <Like
              recommend={data.recommend}
              boardId={boardId}
              recommended={data.recommended}
            />
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default WriteBox;

const Container = styled.div`
  border-radius: 16px;
  background-color: ${(prop) => prop.theme.card};
  border: 1px solid ${(prop) => prop.theme.border};
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100% + 21px);
`;
const Content = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-weight: 400;
  padding: 0 24px;
  line-height: 18px;
  color: ${(prop) => prop.theme.text};

  img {
    max-width: 100%;
  }
`;
