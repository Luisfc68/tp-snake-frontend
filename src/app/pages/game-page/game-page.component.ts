import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {

  ready:boolean = false;

  isAdmin:boolean = true;

  game: Game = {
    id: '123456abcdef',
    players: [
      {
        id: '123abc',
        username: "luisfc68",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      },
      {
        id: '456abc',
        username: "isa123",
        email:"isabella@gmail.com",
        playedGames: 3,
        gamesWon: 4,
        winRatio: 1
      },
      {
        id: '789abc',
        username: "max456",
        email:"max@gmail.com",
        playedGames: 3,
        gamesWon: 1,
        winRatio: 0.33
      },
      {
        id: '123abc',
        username: "luisfc68asdasdasdasd",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      }
    ],
    owner: {
      id: '123abc',
      username: "luisfc68asdasdasdasd",
      email:"luisfc68@gmail.com",
      playedGames: 3,
      gamesWon: 2,
      winRatio: 0.66
    },
    status: 'WAITING',
    maxLevelReached: 1
  };

  constructor() { }

  ngOnInit(): void {}

  notifyReady() {
    this.ready = true;
    // todo do socket notification
  }

  initGame() {
    // todo do socket notification
  }

}
