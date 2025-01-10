'use client';

import React from 'react';
import Welcome from '../containers/RegisterPage/components/Welcome';
import dynamic from 'next/dynamic';

const MaplePick = dynamic(
  () => import('@henein/maple-pick').then((mod) => mod.MaplePick),
  { ssr: false }
);

const test = () => {
  return (
    <>
      <Welcome />
      <MaplePick />
    </>
  );
};

export default test;
