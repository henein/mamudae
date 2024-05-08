import React, { useEffect } from 'react';
import useOptionSelectStore from '../../../../store/myPageOptionSelect';
import {
  useGetMyBoard,
  useGetMyCommentBoard,
} from '../../../hooks/myPageHooks/useUserActivity';
import useUserPageQueryStore from '../../../../store/userPageQuerySlice';
import MyList from './MyList';
import Character from './Character';

const Content = () => {
  const { option } = useOptionSelectStore();
  const { queries } = useUserPageQueryStore();

  const { data: myBoards, refetch: refetchMyBoards } = useGetMyBoard({
    nickname: queries.nickname,
    page: queries.page,
    options: {
      refetchOnWindowFocus: false,
    },
  });
  const { data: myCommentBoards, refetch: refetchMyCommentBoards } =
    useGetMyCommentBoard({
      nickname: queries.nickname,
      page: queries.page,
      options: {
        refetchOnWindowFocus: false,
      },
    });

  useEffect(() => {
    refetchMyBoards();
    refetchMyCommentBoards();
  }, [option, queries]);

  return (
    <div>
      {option == 1 ? (
        <MyList data={myBoards} />
      ) : option == 2 ? (
        <MyList data={myCommentBoards} />
      ) : (
        <Character />
      )}
    </div>
  );
};

export default Content;
