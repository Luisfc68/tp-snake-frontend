import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  @Input()
  game!:Game;

  @Output()
  gameJoined:EventEmitter<Game> = new EventEmitter<Game>();

  constructor() { }

  ngOnInit(): void {}

  emitGameJoined() {
    this.gameJoined.emit(this.game);
  }

}
