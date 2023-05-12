import Link from "next/link";
import styled from "styled-components";
import { useGetAllPost } from "../../../hooks/mainPageHooks/useGetAllPost";
import { BoardInfoType } from "../MainPage";

export type ItemType = {
  id: number;
  title: string;
  commentNum: number;
  name: string;
  createTime: string;
  views: number;
  recomment: number;
  text: string;
  boardType: string;
};

const UserPostList = ({ board_title }: BoardInfoType) => {
  const allPost = useGetAllPost();
  const data = {
    전체: allPost[0].data.content.slice(0, 8),
    자유: allPost[1].data.content.slice(0, 8),
    유머: allPost[2].data.content.slice(0, 8),
    보스: allPost[3].data.content.slice(0, 8),
    직업: allPost[4].data.content.slice(0, 8),
  };

  const boardData = data[board_title];

  return (
    <PostList>
      {boardData.map((item: ItemType) => {
        return (
          <PostItem key={item.id}>
            <Link href={`board/${board_title}/${item.id}`} key={item.id}>
              <span>{item.title}</span>
            </Link>
            <NickName>{item.name}</NickName>
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
    color: ${({ theme }) => theme.Text};
  }
`;
const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NickName = styled.span`
  color: ${({ theme }) => theme.subText};
`;
