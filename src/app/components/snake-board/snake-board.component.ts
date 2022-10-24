import { Component, Input, OnInit } from '@angular/core';
import {Game} from "../../interfaces/game.interface";
import {SnakePlayer} from "../../interfaces/player.interface";

@Component({
  selector: 'app-snake-board',
  templateUrl: './snake-board.component.html',
  styleUrls: ['./snake-board.component.scss']
})
export class SnakeBoardComponent implements OnInit {

  @Input()
  game!:Game;

  snakes?:SnakePlayer[];

  snakeColors:string[] = ['red', 'blue', 'green', 'brown'];

  trackBySnake = (_index:number, snake:SnakePlayer) => snake.id

  constructor() {}

  ngOnInit(): void {
    this.snakes = this.game.players
      .map((player, index) => {
        return {
          ...player,
          color: this.snakeColors[index],
          alive: true
        }
      });
    this.snakes[3].alive = false; // todo borrar, es solo para el maquetado
  }

  get formattedLevel() {
    return this.game.maxLevelReached.toString().padStart(3, '0');
  }
}
