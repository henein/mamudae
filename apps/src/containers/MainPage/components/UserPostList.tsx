import Link from 'next/link';
import styled from 'styled-components';
import { SimpleBoardList } from '../MainPage';

interface Props {
  boardTitle: string;
  data: SimpleBoardList[];
}
const UserPostList = ({ ...props }: Props) => {
  return (
    <PostList>
      {props.data.map((item: SimpleBoardList) => {
        return (
          <PostItem key={item.id}>
            <Link href={`board/${props.boardTitle}/${item.id}`} key={item.id}>
              <span>{item.title}</span>
            </Link>
            <NickName>{item.userName}</NickName>
          </PostItem>
        );
      })}
    </PostList>
  );
};

export default UserPostList;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 30px 0px 24px;
  font-size: 12px;
  a {
    color: ${({ theme }) => theme.text};
  }
`;
const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NickName = styled.span`
  color: ${({ theme }) => theme.subText};
`;
