import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket/socket.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../../components/profile-dialog/profile-dialog.component';
import { GamesService } from '../../services/games/games.service';
import { PlayersService } from '../../services/players/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Game } from '../../interfaces/game.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [SocketService]
})
export class MainPageComponent implements OnInit {

  joinGameCode:string = '';

  constructor(
    private readonly socketService:SocketService,
    private readonly storageService:StorageService,
    private readonly gameService:GamesService,
    private readonly playersService:PlayersService,
    private readonly router:Router,
    private readonly dialog:MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  openProfileDialog() {
    this.dialog.open(ProfileDialogComponent,
      {
        panelClass: ['dialog-container'],
        data: { player: this.storageService.getUserFromStorage() },
        disableClose: true
      });
  }

  toRanking() {
    return this.router.navigateByUrl('/players');
  }

  toRooms() {
    return this.router.navigateByUrl('/rooms');
  }

  doLogout() {
    this.storageService.clearStorage();
    return this.router.navigateByUrl('/auth');
  }

  createGame() {
    this.gameService.createGame()
      .then(game => {
        this.socketService.connectToGame(game.id);
        game.players[0] = this.storageService.getUserFromStorage()!;
        this.router.navigateByUrl('/game', { state: {game} });
      })
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));
  }

  joinExistingGame() {
    let gameToJoin:Game;
    this.gameService.getGame(this.joinGameCode)
      .then(game => {
        gameToJoin = game;
        this.socketService.connectToGame(game.id);
        return Promise.all(game.players.map(player => this.playersService.getPlayer(player as any)));
      })
      .then(players => {
        gameToJoin.players = players;
        const user = this.storageService.getUserFromStorage()!;
        if (!gameToJoin.players.map(player => player.id).includes(user.id)) {
          gameToJoin.players[gameToJoin.players.length] = user;
        }
        this.router.navigateByUrl('/game', { state: {game: gameToJoin} });
      })
      .catch(() => this.snackBar.open('Game not found!', 'OK', { panelClass: ['errorSnackBar'] }));
  }

}
