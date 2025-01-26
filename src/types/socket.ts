import { ConsoleLog, ServerStatus, PlayerData } from './websocket';

export interface ServerEvents {
  'console:log': (log: ConsoleLog) => void;
  'server:status': (status: ServerStatus) => void;
  'players:update': (players: PlayerData[]) => void;
  'command:response': (response: { success: boolean; message: string }) => void;
}

export interface ClientEvents {
  'command:execute': (command: string) => void;
  'server:request_status': () => void;
  'players:request_list': () => void;
}