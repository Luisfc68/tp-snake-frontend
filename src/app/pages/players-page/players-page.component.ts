import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { PlayersService } from '../../services/players/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit {

  limit = 5;
  offset = 0;
  hideLeftArrow = true;
  hideRightArrow = false;

  players: Player[] = [];

  trackByPlayer = (index: number, player: Player) => player.id;

  constructor(
    private readonly playersService: PlayersService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPlayers()
  }

  getPlayers() {
    this.playersService.getPlayers(this.limit, this.offset)
      .then(response => this.players = response)
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))
  }

  getNextPlayers() {
    this.offset += this.limit;
    this.playersService.getPlayers(this.limit, this.offset)
      .then(response => {
        if (response.length != 0) {
          this.players = response;
          this.handleNextPlayersArrows();
        } else {
          this.offset -= this.limit;
          this.hideRightArrow = true;
        }
      })
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));
  }

  private handleNextPlayersArrows() {
    if (this.hideLeftArrow) {
      this.hideLeftArrow = false;
    }
    if(this.players.length < this.limit) {
      this.hideRightArrow = true;
    }
  }

  getPreviousPlayers() {
    if (this.hideRightArrow) {
      this.hideRightArrow = false;
    }
    this.offset -= this.limit;
    this.playersService.getPlayers(this.limit, this.offset)
      .then(response => this.players = response)
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }));

    if (this.offset === 0) {
      this.hideLeftArrow=true;
    }
  }

  doReturn() {
    this.router.navigateByUrl('/');
  }

}
