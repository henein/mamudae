import React, { useState } from 'react';
import { RoutePath } from '../../constants';
import { Button } from '../components/button';
import { Team } from '@henein/mamudae-lib';

export const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [team, setTeam] = useState<Team>('left');

  const openMaplePick = async () => {
    const iframe = `<html><head><title>Maple Pick</title><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="${RoutePath.MaplePick}/${roomId}?team=${team}" style="height:100%;width:100%;border:none;"></iframe></body></html>`;

    const win = window.open(
      '',
      '_blank',
      'autoHideMenuBar=true,width=1280,height=720,useContentSize=true'
    );
    win?.document.write(iframe);
  };

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-screen">
      <input
        className="px-3 py-2 border rounded-md border-gray-400 active:border-orange-400"
        onChange={(event) => setRoomId(event.target.value)}
        placeholder="Enter Room ID"
      />
      <div className="flex gap-4 my-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="team"
            value="left"
            checked={team === 'left'}
            onChange={() => setTeam('left')}
            className="mr-2"
          />
          Left Team
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="team"
            value="right"
            checked={team === 'right'}
            onChange={() => setTeam('right')}
            className="mr-2"
          />
          Right Team
        </label>
      </div>
      <Button onClick={() => openMaplePick()}>입장</Button>
    </div>
  );
};
