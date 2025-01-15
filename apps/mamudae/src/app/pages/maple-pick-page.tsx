import React, { useEffect, useState } from 'react';
import { MaplePick } from '@henein/maple-pick';
import { useSocket } from '../hooks/use-socket';
import { RoomState } from '@henein/mamudae-lib';
import { useParams } from 'react-router-dom';

export const MaplePickPage = () => {
  const params = useParams();
  const socket = useSocket();
  const [roomState, setRoomState] = useState<RoomState>()

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.emit('join', params.id ?? '', 'left', (state) => {
      console.log('Joined room', state);
      setRoomState(state);
    });

    socket.on('update', (state: RoomState) => {
      console.log('Update room', state);
      setRoomState(state);
    });
  }, [params.id, socket]);

  return (
    <>
      {/* <Helmet>
        <title>Maple Pick</title>
      </Helmet> */}
      <MaplePick roomState={roomState} />
    </>
  );
};
