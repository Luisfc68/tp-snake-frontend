export interface Player {
  id:string;
  username:string;
  email:string;
  playedGames:number;
  gamesWon:number;
  winRatio:number;
  image?:string;
}

export type SnakePlayer = Player & {
  color:string;
  alive:boolean;
}
