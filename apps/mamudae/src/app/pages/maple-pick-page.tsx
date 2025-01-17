import React, { useEffect, useMemo, useState } from 'react';
import { MaplePick } from '@henein/maple-pick';
import { useSocket } from '../hooks/use-socket';
import { JobId, RoomState, Team } from '@henein/mamudae-lib';
import { useParams, useSearchParams } from 'react-router-dom';

export const MaplePickPage = () => {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const socket = useSocket(params.id ?? '', searchParams.get('team') as Team);
  const [roomState, setRoomState] = useState<RoomState>();
  const [error, setError] = useState<string>();

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

    socket.on('welcome', (state, error) => {
      if (error) {
        setError(error);
        return;
      }

      console.log('Welcome', state);
      setRoomState(state);
    });

    socket.on('update', (state: RoomState) => {
      console.log('Update room', state);
      setRoomState(state);
    });
  }, [params.id, socket]);

  const onSelect = (jobId: JobId) => {
    const currentSequence = roomState?.sequences[0];
    const team = searchParams.get('team') as Team;

    if (
      (currentSequence?.action === 'ban' ||
        currentSequence?.action === 'pick') &&
      currentSequence.team === team
    ) {
      socket?.emit('select', jobId);
    } else if (
      currentSequence?.action === 'votePick' &&
      roomState?.coinTossTeam === team
    ) {
      socket?.emit('select', jobId);
    }
  };

  const onPush = (jobId: JobId) => {
    const currentSequence = roomState?.sequences[0];
    const team = searchParams.get('team') as Team;

    if (
      (currentSequence?.action === 'ban' ||
        currentSequence?.action === 'pick') &&
      currentSequence.team === team
    ) {
      socket?.emit('push', jobId);
    } else if (
      currentSequence?.action === 'votePick' &&
      roomState?.coinTossTeam === team
    ) {
      socket?.emit('push', jobId);
    }
  };

  return (
    <>
      {/* <Helmet>
        <title>Maple Pick</title>
      </Helmet> */}
      {!error ? (
        <MaplePick
          roomState={roomState}
          team={searchParams.get('team') as Team}
          onSelect={onSelect}
          onPush={onPush}
        />
      ) : (
        <div className="flex h-screen justify-center items-center">
          <h1 className="text-3xl font-bold">{error}</h1>
        </div>
      )}
    </>
  );
};
