import React from 'react';
import { RoutePath } from '../../constants';
import { Button } from '../components/button';

export const HomePage = () => {
  const openMaplePick = async () => {
    window.open(
      RoutePath.MaplePick,
      '_blank',
      'autoHideMenuBar=true,width=1280,height=720,useContentSize=true'
    );
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <input className="px-3 py-2 border rounded-md border-gray-400 active:border-orange-400" />
      <Button onClick={() => openMaplePick()}>입장</Button>
    </div>
  );
};
