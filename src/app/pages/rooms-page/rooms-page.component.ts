import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GameService } from '../../services/games/games.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {

  limit= 5;
  offset= 0;
  hideLeftArrow=true;
  hideRightArrow=false;


  rooms: Game[] = [];
  
  trackByGame = (_index:number, game:Game) => game.id

  constructor(
    private readonly gamesService:GameService,
    private readonly snackBar: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.getRooms()
  }


  getRooms(){
    this.gamesService.getRooms(this.limit,this.offset).then(
      response =>{
        this.rooms = response;
      })
    .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))
  }

  getNextRooms(){
    this.offset+= this.limit;
    this.gamesService.getRooms(this.limit,this.offset).then(
      response =>{
        if(response.length!=0){
          this.rooms=[]
          this.rooms = response;
          if(this.hideLeftArrow){
            this.hideLeftArrow=false;
          }
        }
        else{
          this.offset-= this.limit;
          this.hideRightArrow=true;
        }
      }
    )
  .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))  
  }
  getPreviousRooms(){
    if(this.offset-this.limit>=0){
      if(this.hideRightArrow){
        this.hideRightArrow=false;
      }
    this.offset-= this.limit;
    this.gamesService.getRooms(this.limit,this.offset).then(
      response =>{
        this.rooms = response;
      }
    )
  .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))  
  }
  else{
    this.hideLeftArrow=true;
  }
}


}
