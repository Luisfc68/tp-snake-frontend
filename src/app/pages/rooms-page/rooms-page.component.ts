import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {

  rooms: Game[] = [
    {
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
    },
    {
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
      ],
      owner: {
        id: '123abc',
        username: "luisfc68",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      },
      status: 'WAITING',
      maxLevelReached: 1
    },
    {
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
    },
    {
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
      ],
      owner: {
        id: '123abc',
        username: "luisfc68",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      },
      status: 'WAITING',
      maxLevelReached: 1
    },
    {
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
    },
    {
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
      ],
      owner: {
        id: '123abc',
        username: "luisfc68",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      },
      status: 'WAITING',
      maxLevelReached: 1
    },
    {
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
    },
    {
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
      ],
      owner: {
        id: '123abc',
        username: "luisfc68",
        email:"luisfc68@gmail.com",
        playedGames: 3,
        gamesWon: 2,
        winRatio: 0.66
      },
      status: 'WAITING',
      maxLevelReached: 1
    },
    {
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
    },
  ]

  trackByGame = (_index:number, game:Game) => game.id

  constructor() { }

  ngOnInit(): void {
  }

}
