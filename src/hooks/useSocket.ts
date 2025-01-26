import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { ServerEvents, ClientEvents } from '@/types/socket';

interface UseSocketOptions {
  uri: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
}

export function useSocket({
  uri,
  onConnect,
  onDisconnect,
  onError,
}: UseSocketOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket<ServerEvents, ClientEvents>>();

  useEffect(() => {
    const socket = io(uri, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 3000,
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      setIsConnected(true);
      onConnect?.();
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      onDisconnect?.();
    });

    socket.on('connect_error', (error) => {
      onError?.(error);
    });

    return () => {
      socket.disconnect();
    };
  }, [uri, onConnect, onDisconnect, onError]);

  const emit = useCallback(<T extends keyof ClientEvents>(
    event: T,
    ...args: Parameters<ClientEvents[T]>
  ) => {
    if (socketRef.current) {
      socketRef.current.emit(event, ...args);
    }
  }, []);

  const on = useCallback(<T extends keyof ServerEvents>(
    event: T,
    callback: (...args: Parameters<ServerEvents[T]>) => void
  ) => {
    if (socketRef.current) {
      socketRef.current.on(event, callback as any);
    }
  }, []);

  const off = useCallback(<T extends keyof ServerEvents>(
    event: T,
    callback: (...args: Parameters<ServerEvents[T]>) => void
  ) => {
    if (socketRef.current) {
      socketRef.current.off(event, callback as any);
    }
  }, []);

  return {
    isConnected,
    emit,
    on,
    off,
  };
}