import React, { useEffect, useState } from "react";
import { generateHTML } from "@tiptap/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Announcement from "../../component/AnnounceComponent/Announcement";
import Button from "../../component/Button";
import Login from "../../component/LoginComponent/Login";
import { useGetComment } from "../../hooks/detailPageHooks/useComment";
import { useDetail } from "../../hooks/detailPageHooks/useDetail";
import Comment from "./components/Comment";
import Like from "./components/Like";
import Title from "./components/Title";
import Write from "./components/Write";
import CommentWarning from "../../component/WarningComponent/CommentWarning";
import BoardWarning from "../../component/WarningComponent/BoardWarning";
import useOnWarning from "../../hooks/reduxHooks/useOnWarning";
import Link from "next/link";
import { extensions } from "../../component/Editor/Editor";
import { useDispatch } from "react-redux";
import { onWarnings } from "../../../store/warningSlice/onWarning";

export interface WarningState {
  btnType: "delete" | "modify" | "report";
  location: "board" | "comment";
}
export type CommentType = {
  comment: string;
  id: number;
  modifiedDate: string;
  tag: string;
  writerId: number;
  replyId: string;
  uid: string;
  replies?: any;
};

const DetailPage = () => {
  const router = useRouter();
  const boardId = router.query.id as string;
  const dispatch = useDispatch();
  const { isWarning, warningType, warningLocation } = useOnWarning();

  const { data, refetch } = useDetail({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  const commentdata = useGetComment({
    boardId,
    options: {
      refetchOnWindowFocus: false,
    },
  }).data;

  const [context, setContext] = useState("");
  useEffect(() => {
    if (data) {
      const html = generateHTML(JSON.parse(data.text), extensions);
      setContext(html);
    }
  }, [data]);

  const [isInAT, setIsInAT] = useState(false);
  useEffect(() => {
    const storedValue = localStorage.getItem("access");
    if (storedValue) {
      setIsInAT(true);
    }
    refetch();
  }, [isInAT, refetch]);

  const btnClick = ({ btnType, location }: WarningState) => {
    if (localStorage.getItem("access") === null) {
      alert("로그인 후 이용 가능합니다.");
      return;
    } else {
      dispatch(onWarnings({ warningType: btnType, warningLocation: location }));
    }
  };

  return (
    <Container>
      <Announcement />
      <SideBox>
        <Login />
      </SideBox>
      <div>
        <WriteBox>
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
        </WriteBox>

        <BoardOptionBox>
          <Button type="button" sort="secondary">
            목록
          </Button>
          {data && data.uid ? (
            <RightItems>
              <Link href={`/update/${boardId}`}>
                <Button type="button" sort="secondary">
                  수정하기
                </Button>
              </Link>
              <Button
                type="button"
                sort="danger"
                onClick={() => {
                  btnClick({ btnType: "delete", location: "board" });
                }}
              >
                삭제하기
              </Button>
            </RightItems>
          ) : (
            <RightItems>
              <Button
                type="button"
                sort="danger"
                onClick={() => {
                  btnClick({ btnType: "report", location: "board" });
                }}
              >
                신고하기
              </Button>
            </RightItems>
          )}
        </BoardOptionBox>

        <CommentBox>
          {data && <Write boardId={boardId} totalComment={data.commentNum} />}
          <Comments>
            {commentdata &&
              commentdata.commentList.map((item: CommentType, idx: number) => {
                return (
                  <Comment
                    writerList={commentdata.writerList}
                    comment={item.comment}
                    nickName={
                      item.writerId === null
                        ? "알 수 없음"
                        : commentdata.writerList[item.writerId].nickName
                    }
                    modifiedDate={item.modifiedDate}
                    replies={item.replies}
                    key={idx}
                    id={item.id}
                    boardId={boardId}
                    uid={
                      item.writerId === null
                        ? null
                        : commentdata.writerList[item.writerId].uid
                    }
                    role={
                      item.writerId === null
                        ? null
                        : commentdata.writerList[item.writerId].role
                    }
                    isLastComment={idx + 1 == commentdata.commentList.length}
                  />
                );
              })}
          </Comments>
        </CommentBox>
        {isWarning && (
          <StickyView>
            {warningLocation === "board" ? (
              <BoardWarning type={warningType} />
            ) : (
              <CommentWarning type={warningType} />
            )}
          </StickyView>
        )}
      </div>
    </Container>
  );
};

export default DetailPage;
const StickyView = styled.div`
  position: sticky;
  z-index: 1001;
`;
const BoardOptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;
const RightItems = styled.div`
  display: flex;
  gap: 8px;
`;
const Comments = styled.div`
  padding: 20px 24px;
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

const SideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  background-color: ${(prop) => prop.theme.card};
  width: 808px;
  border-radius: 16px;
  border: 1px solid ${(prop) => prop.theme.border};
`;
const WriteBox = styled.div`
  border-radius: 16px;
  background-color: ${(prop) => prop.theme.card};
  border: 1px solid ${(prop) => prop.theme.border};
  display: flex;
  flex-direction: column;
  width: 808px;
`;
const Container = styled.div`
  margin: 0 auto;
  width: 1140px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
