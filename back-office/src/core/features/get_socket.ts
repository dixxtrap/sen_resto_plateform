// src/socketManager.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initializeSocket = (url: string) => {
  if (!socket) {
    socket = io(url, {
      transports: ['websocket'], // Ensure WebSocket transport for real-time communication
    });

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error);
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
