export interface Player {
  id:string;
  username:string;
  email:string;
  playedGames:number;
  gamesWon:number;
  winRatio:number;
  profileImage?:string;
}
