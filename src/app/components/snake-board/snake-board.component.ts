import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { Player, SnakePlayer } from '../../interfaces/player.interface';
import { environment } from '../../../environments/environment';

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
  }

  get formattedLevel() {
    return this.game.maxReachedLevel.toString().padStart(3, '0');
  }

  getProfileImage(snake:Player) {
    return environment.apiUrl + snake.image;
  }
}
