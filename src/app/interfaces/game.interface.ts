import { Player } from './player.interface';

export type GameStatus = 'WAITING'|'FINISHED'|'PLAYING';

export interface Game {
  id:string;
  players: Player[];
  owner: Player;
  status: GameStatus
  maxLevelReached:number;
}
