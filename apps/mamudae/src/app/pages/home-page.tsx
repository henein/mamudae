import React, { useState } from 'react';
import { RoutePath } from '../../constants';
import { Button } from '../components/button';

export const HomePage = () => {
  const [roomId, setRoomId] = useState('');

  const openMaplePick = async () => {
    const iframe = `<html><head><title>Maple Pick</title><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="${RoutePath.MaplePick}/${roomId}" style="height:100%;width:100%;border:none;"></iframe></body></html>`;

    const win = window.open(
      '',
      '_blank',
      'autoHideMenuBar=true,width=1280,height=720,useContentSize=true'
    );
    win?.document.write(iframe);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <input className="px-3 py-2 border rounded-md border-gray-400 active:border-orange-400" onChange={(event => setRoomId(event.target.value))} />
      <Button onClick={() => openMaplePick()}>입장</Button>
    </div>
  );
};
