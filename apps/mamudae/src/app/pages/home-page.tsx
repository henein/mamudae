import { RoutePath } from '../../constants';
import { Button } from '../components/button';
import { Team } from '@henein/mamudae-lib';
import React, { useEffect, useState } from 'react';
import { useAlert } from 'react-alert';

export const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [team, setTeam] = useState<Team>();

  const alert = useAlert();

  const openMaplePick = async () => {
    const iframe = `<html><head><title>Maple Pick</title><style>body, html {width: 100%; height: 100%; margin: 0; padding: 0}</style></head><body><iframe src="${RoutePath.MaplePick}/${roomId}?team=${team}" style="height:100%;width:100%;border:none;"></iframe></body></html>`;

    const win = window.open(
      '',
      '_blank',
      'autoHideMenuBar=true,width=1280,height=720,useContentSize=true',
    );
    win?.document.write(iframe);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <input
        className="rounded-md border border-gray-400 px-3 py-2 active:border-orange-400"
        onChange={(event) => setRoomId(event.target.value)}
        placeholder="Enter Room ID"
      />
      <div className="my-4 flex gap-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="team"
            value="left"
            checked={team === 'left'}
            onChange={() => setTeam('left')}
            className="mr-2"
          />
          선픽
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
          후픽
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="team"
            value=""
            checked={team === undefined}
            onChange={() => setTeam(undefined)}
            className="mr-2"
          />
          관전자
        </label>
      </div>
      <div className="flex gap-4">
        <Button onClick={() => openMaplePick()}>입장</Button>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.protocol}/${window.location.hostname}:${window.location.port}${RoutePath.MaplePick}/${roomId}?team=${team}`,
            );
            alert.success('복사 완료!');
          }}
        >
          링크 복사
        </Button>
      </div>
    </div>
  );
};
