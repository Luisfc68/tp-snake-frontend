import { Component, OnInit } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GameService } from '../../services/games/games.service';


@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {

  limit= 5;
  offset= 0;
  jumpedAmmount=5;
  currentLeftArrow=true;
  currentRightArrow=false;


  rooms: Game[] = [];
  
  trackByGame = (_index:number, game:Game) => game.id

  constructor(
    private readonly gamesService:GameService) { 
  }

  ngOnInit(): void {
    this.getRooms()
  }


  getRooms(){
    this.gamesService.getRooms(this.limit,this.offset).subscribe(
      response =>{
        console.log(response)
        this.rooms = response;
      })
  }

  getNextRooms(){
    this.offset+= this.jumpedAmmount;
    this.gamesService.getRooms(this.limit,this.offset).subscribe(
      response =>{
        if(response.length!=0){
          this.rooms=[]
          console.log(response)
          this.rooms = response;
          if(this.currentLeftArrow){
            this.currentLeftArrow=false;
          }
        }
        else{
          this.offset-= this.jumpedAmmount;
          this.currentRightArrow=true;
        }
      }
    )
  }
  getPreviousRooms(){
    if(this.offset-this.jumpedAmmount>=0){
      if(this.currentRightArrow){
        this.currentRightArrow=false;
      }
    this.offset-= this.jumpedAmmount;
    this.gamesService.getRooms(this.limit,this.offset).subscribe(
      response =>{
        console.log(response)
        this.rooms = response;
      }
    )
  }
  else{
    this.currentLeftArrow=true;
  }
}


}
