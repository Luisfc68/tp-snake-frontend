import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';

@Component({
  selector: 'app-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit {

  players: Player[] = [
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
      id: '456abc',
      username: "papa",
      email:"isabella@gmail.com",
      playedGames: 3,
      gamesWon: 4,
      winRatio: 1
    },
    {
      id: '789abc',
      username: "mama",
      email:"max@gmail.com",
      playedGames: 3,
      gamesWon: 1,
      winRatio: 0.33
    },
  ]

  trackByPlayer = (index:number, player:Player) => player.id

  constructor() { }

  ngOnInit(): void {}

}
