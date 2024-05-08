import React from 'react';
import styled from 'styled-components';
import Pagenate from '../../SearchPage/components/Pagenate';
import CommonListItem from '../../../component/CommonListItem';

const MyList = ({ ...props }) => {
  return (
    <>
      {props.data?.content.length &&
        props.data.content.map((item: any, idx: number) => {
          if (idx === props.data.content.length - 1) {
            return <CommonListItem {...item} key={item.id} />;
          } else {
            return (
              <div key={item.id}>
                <CommonListItem key={item.id} {...item} />
                <Line />
              </div>
            );
          }
        })}
      <Pagenate data={props.data} />
    </>
  );
};

export default MyList;

const Line = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.divider};
  margin: 8px 0px;
`;
