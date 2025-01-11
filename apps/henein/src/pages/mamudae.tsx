'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const MaplePick = dynamic(
  () => import('@henein/maple-pick').then((mod) => mod.MaplePick),
  { ssr: false }
);

const test = () => {
  return (
    <>
      <MaplePick />
    </>
  );
};

export default test;
