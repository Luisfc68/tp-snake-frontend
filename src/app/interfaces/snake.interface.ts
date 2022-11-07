export interface SnakeData {
  player:string;
  positions:BoardPosition[];
  direction:Direction;
}

export type Direction = 'UP'|'DOWN'|'RIGHT'|'LEFT';

export interface BoardPosition {
  x:number;
  y:number;
}
