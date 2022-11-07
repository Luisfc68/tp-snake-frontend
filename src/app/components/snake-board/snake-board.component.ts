import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { Player, SnakePlayer } from '../../interfaces/player.interface';
import { environment } from '../../../environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { SnakeDrawer } from './SnakeDrawer';
import { BoardPosition, SnakeData } from '../../interfaces/snake.interface';

@Component({
  selector: 'app-snake-board',
  templateUrl: './snake-board.component.html',
  styleUrls: ['./snake-board.component.scss']
})
export class SnakeBoardComponent implements OnInit {

  @Input()
  game!:Game;

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  snakes?:SnakePlayer[];

  snakeColors:string[] = ['#FC0303', '#030FFC', '#338F3A', '#735006'];

  trackBySnake = (_index:number, snake:SnakePlayer) => snake.id;

  private drawer:SnakeDrawer|null = null;

  private readonly defaultBoardSize = 70;

  constructor(
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    this.calculateSnakes();
    this.drawer = new SnakeDrawer(this.canvas.nativeElement);
    this.drawer.boardSize = this.defaultBoardSize;
  }

  calculateSnakes() {
    this.snakes = this.game.players
      .map((player, index) => {
        return {
          ...player,
          color: this.snakeColors[index],
          alive: true
        }
      });
    if (this.drawer) {
      const colorMap = new Map();
      this.snakes.forEach((snake, index) => colorMap.set(snake.id, this.snakeColors[index]));
      this.drawer.snakeColors = colorMap;
    }
  }

  get formattedLevel() {
    return this.game.maxReachedLevel.toString().padStart(3, '0');
  }

  getProfileImage(snake:Player) {
    return environment.apiUrl + snake.image;
  }

  gameCodeToClipboard() {
    this.clipboard.copy(this.game.id);
  }


  set boardSize(boardSize:number) {
    if (this.drawer) {
      this.drawer.boardSize = boardSize;
    }
  }

  update(snakeData:SnakeData[]) {
    this.drawer?.update(snakeData);
  }

  clearFood() {
    this.drawer?.clearCurrentFood();
  }

  setFood(food:BoardPosition) {
    if (this.drawer) {
      debugger
      this.drawer.currentFood = food;
    }
  }

  killSnake(playerId:string) {
    if (this.snakes) {
      this.snakes.filter(snake => snake.id === playerId)[0].alive = false;
    }
  }

}
