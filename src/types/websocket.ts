export interface WebSocketMessage {
  type: string;
  payload: any;
}

export interface ServerStatus {
  players: number;
  maxPlayers: number;
  tps: number;
  cpuUsage: number;
  memoryUsage: number;
  version: string;
}

export interface PlayerData {
  name: string;
  health: number;
  level: number;
  ping: number;
  playTime: string;
}

export interface ConsoleLog {
  timestamp: string;
  type: 'info' | 'warn' | 'error';
  message: string;
}