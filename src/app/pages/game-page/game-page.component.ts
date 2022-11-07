import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket/socket.service';
import { ServerEvents, ClientEvents } from '../../shared/constants/Events';
import { Player } from '../../interfaces/player.interface';
import { SnakeBoardComponent } from '../../components/snake-board/snake-board.component';
import { StorageService } from '../../services/storage/storage.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BoardPosition, SnakeData } from '../../interfaces/snake.interface';
import { MatDialog } from '@angular/material/dialog';
import { EndDialogComponent } from '../../components/end-dialog/end-dialog.component';

@UntilDestroy()
@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit, OnDestroy {

  ready:boolean = false;

  isAdmin:boolean = false;

  started:boolean = false;

  actualKey:string|null = null;

  game?:Game;

  @ViewChild(SnakeBoardComponent)
  board!:SnakeBoardComponent;

  constructor(
    private readonly router:Router,
    private readonly snackBar: MatSnackBar,
    private readonly socketService:SocketService,
    private readonly storageService:StorageService,
    private readonly dialog:MatDialog,
  ) {
    const navigationState = this.router.getCurrentNavigation()?.extras?.state;
    if (navigationState) {
      this.game = navigationState['game'];
    } else {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.initListeners();
    this.isAdmin = this.game?.owner.id === this.storageService.getUserFromStorage()?.id;
  }

  private initListeners() {
    this.initJoinListener();
    this.initLeftListener();
    this.initLevelUpListener();
    this.initGameStartListener();
    this.initMovementListener();
    this.initFoodEatenListener();
    this.initFoodSpawnListener();
    this.initDeathListener();
    this.initEndGameListener();
    this.initErrorListeners();
  }

  private initJoinListener() {
    this.socketService.listenTo<Player>(ServerEvents.PLAYER_JOIN)
      .pipe(untilDestroyed(this))
      .subscribe(player => {
        this.game?.players.push(player);
        this.board.calculateSnakes();
      });
  }

  private initLeftListener() {
    this.socketService.listenTo<string>(ServerEvents.PLAYER_LEFT)
      .pipe(untilDestroyed(this))
      .subscribe(playerId => {
        this.game!.players = this.game!.players.filter(player => player.id !== playerId);
        this.board.calculateSnakes();
      });
  }

  private initLevelUpListener() {
    this.socketService.listenTo<string>(ServerEvents.LEVEL_UP)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.game!.maxReachedLevel++;
      });
  }

  private initGameStartListener() {
    this.socketService.listenTo<{boardSize:number}>(ServerEvents.GAME_START)
      .pipe(untilDestroyed(this))
      .subscribe(args => {
        this.board.boardSize = args.boardSize;
        this.board.calculateSnakes();
      });
  }

  private initMovementListener() {
    this.socketService.listenTo<SnakeData[]>(ServerEvents.MOVEMENTS)
      .pipe(untilDestroyed(this))
      .subscribe(args => {
        console.log(args)
        this.board.update(args);
      });
  }

  private initFoodEatenListener() {
    this.socketService.listenTo<void>(ServerEvents.FOOD_EATEN)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.board.clearFood());
  }

  private initFoodSpawnListener() {
    this.socketService.listenTo<BoardPosition>(ServerEvents.FOOD_SPAWN)
      .pipe(untilDestroyed(this))
      .subscribe(food => this.board.setFood(food));
  }

  private initDeathListener() {
    this.socketService.listenTo<string>(ServerEvents.DEATH)
      .pipe(untilDestroyed(this))
      .subscribe(playerId => {
        this.board.killSnake(playerId);
        const player = this.storageService.getUserFromStorage();
        if (playerId === player?.id) {
          this.dialog.open(EndDialogComponent,
            {
              panelClass: ['dialog-container'],
              disableClose: true
            });
        }
      });
  }

  private initEndGameListener() {
    this.socketService.listenTo<string>(ServerEvents.FINISHED)
      .pipe(untilDestroyed(this))
      .subscribe(playerId => {
        debugger
        const player = this.storageService.getUserFromStorage();
        console.log('winner ',playerId)
        if (playerId === player?.id) {
          this.snackBar.open('You win! Your snake is the best!', 'OK',
            {
              panelClass: ['successSnackBar', 'winnerSnackBar'],
              verticalPosition: 'top'
            }
          );
        }
      });
  }

  private initErrorListeners() {
    this.socketService.listenTo<{error:string}>(ClientEvents.INIT_GAME)
      .pipe(untilDestroyed(this))
      .subscribe(error => {
        this.snackBar.open(error.error, 'OK', { panelClass: ['errorSnackBar'] });
        this.started = false;
      });
  }

  toggleReady() {
    this.ready = !this.ready;
    if (this.ready) {
      this.socketService.emit(ClientEvents.PLAYER_CONFIRM);
    } else {
      this.socketService.emit(ClientEvents.PLAYER_UNCONFIRMED);
    }
  }

  initGame() {
    this.socketService.emit(ClientEvents.INIT_GAME);
    this.started = true;
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const controls:{[key:string]:string} = {
      ArrowUp: 'UP',
      ArrowDown: 'DOWN',
      ArrowLeft: 'LEFT',
      ArrowRight: 'RIGHT'
    };
    if (this.started && Object.keys(controls).includes(event.key) && this.actualKey !== event.key) {
      this.socketService.emit(ClientEvents.CHANGE_DIRECTION, { movingDirection: controls[event.key] });
    }
  }

}
