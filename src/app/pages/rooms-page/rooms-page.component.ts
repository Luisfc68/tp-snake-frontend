import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GamesService } from '../../services/games/games.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocketService } from '../../services/socket/socket.service';
import {PlayersService} from "../../services/players/players.service";
import {StorageService} from "../../services/storage/storage.service";


@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss'],
  providers: [SocketService]
})
export class RoomsPageComponent implements OnInit {

  limit = 8;
  offset = 0;
  hideLeftArrow = true;
  hideRightArrow = false;

  rooms: Game[] = [];

  trackByGame = (_index:number, game:Game) => game.id

  constructor(
    private readonly gamesService:GamesService,
    private readonly playersService:PlayersService,
    private readonly socketService:SocketService,
    private readonly storageService:StorageService,
    private readonly snackBar: MatSnackBar,
    private readonly router:Router
  ) {}

  ngOnInit(): void {
    this.getRooms()
      .then(() => {
        if (this.rooms.length < this.limit) {
          this.hideRightArrow = true;
        }
      });
  }

  getRooms(){
    return this.gamesService.getRooms(this.limit,this.offset)
      .then(response => this.rooms = response)
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));
  }

  getNextRooms() {
    this.offset += this.limit;
    this.gamesService.getRooms(this.limit,this.offset)
      .then(response => {
        if (response.length != 0) {
          this.rooms = response;
          this.handleNextRoomArrows();
        } else {
          this.offset -= this.limit;
          this.hideRightArrow = true;
        }
      })
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));
  }

  handleNextRoomArrows() {
    if (this.hideLeftArrow) {
      this.hideLeftArrow = false;
    }
    if(this.rooms.length < this.limit) {
      this.hideRightArrow = true;
    }
  }

  getPreviousRooms() {
    if (this.hideRightArrow) {
      this.hideRightArrow = false;
    }

    this.offset -= this.limit;
    this.gamesService.getRooms(this.limit, this.offset)
      .then(response => this.rooms = response)
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));

    if (this.offset === 0) {
      this.hideLeftArrow=true;
    }
  }

  doReturn() {
    this.router.navigateByUrl('/');
  }

  enterGame(game:Game) {
    let gameToJoin:Game;
    this.gamesService.getGame(game.id)
      .then(game => {
        gameToJoin = game;
        this.socketService.connectToGame(game.id);
        return Promise.all(game.players.map(player => this.playersService.getPlayer(player as any)));
      })
      .then(gamePlayers => {
        gameToJoin.players = gamePlayers;
        const user = this.storageService.getUserFromStorage()!;
        if (!gameToJoin.players.map(player => player.id).includes(user.id)) {
          gameToJoin.players[gameToJoin.players.length] = user;
        }
        this.router.navigateByUrl('/game', { state: {game: gameToJoin} });
      });
  }
}
