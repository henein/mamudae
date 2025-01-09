import React from 'react';
import useOptionSelectStore from '../../../../store/option/headerOption';
import {
  useGetMyBoard,
  useGetMyCommentBoard,
} from '../../../hooks/userPageHooks/useUserActivity';
import MyList from './MyList';
import Character from './Character';

const Content = ({ ...props }) => {
  const { option } = useOptionSelectStore();

  const { data: myBoards } = useGetMyBoard({
    nickname: props.nickname,
    page: props.page,
    options: {
      refetchOnWindowFocus: false,
    },
  });
  const { data: myCommentBoards } = useGetMyCommentBoard({
    nickname: props.nickname,
    page: props.page,
    options: {
      refetchOnWindowFocus: false,
    },
  });

  return (
    <>
      {option == 0 ? (
        <MyList data={myBoards} />
      ) : option == 1 ? (
        <MyList data={myCommentBoards} />
      ) : (
        <Character uid={props.uid} />
      )}
    </>
  );
};

export default Content;
