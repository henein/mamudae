import React from 'react';
import { Helmet } from 'react-helmet';
import { MaplePick } from '@henein/maple-pick';

export const MaplePickPage = () => {
  return (
    <>
      <Helmet>
        <title>Maple Pick</title>
      </Helmet>
      <MaplePick />
    </>
  );
};
