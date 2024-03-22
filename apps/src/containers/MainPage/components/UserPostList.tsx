import Link from "next/link";
import styled from "styled-components";
import { useGetBoard } from "../../../hooks/mainPageHooks/useGetBoard";

export type ItemType = {
  id: number;
  title: string;
  commentNum: number;
  userName: string;
  createTime: string;
  views: number;
  recomment: number;
  text: string;
  boardType: string;
};

const UserPostList = ({ boardType }: any) => {
  const { data } = useGetBoard(boardType);

  return (
    <PostList>
      {data &&
        data.content.slice(0, 8).map((item: ItemType) => {
          return (
            <PostItem key={item.id}>
              <Link href={`board/${item.boardType}/${item.id}`} key={item.id}>
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
