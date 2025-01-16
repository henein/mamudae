import {
  ServerToClientEvents,
  ClientToServerEvents,
  Team,
} from '@henein/mamudae-lib';
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

export const useSocket = (roomId: string, team?: Team) => {
  const [socket, setSocket] =
    useState<Socket<ServerToClientEvents, ClientToServerEvents>>();

  useEffect(() => {
    const socket = io('http://localhost:3000', { query: { roomId, team } });
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [roomId, team]);

  return socket;
};
