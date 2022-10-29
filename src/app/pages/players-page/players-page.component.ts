import { Component, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import { PlayersService } from '../../services/players/players.service';
@Component({
  selector: 'app-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit {

  limit= 2;
  offset= 0;
  jumpedAmmount=2;
  currentLeftArrow=true;
  currentRightArrow=false;


  players: Player[] = [];
  
  trackByPlayer = (index:number, player:Player) => player.id

  constructor(
    private readonly playersService:PlayersService) { 
  }

  ngOnInit(): void {
    this.getPlayers()
  }


  getPlayers(){
    this.playersService.getPlayers(this.limit,this.offset).subscribe(
      response =>{
        console.log(response)
        this.players = response;
      })
  }

  getNextPlayers(){
    this.offset+= this.jumpedAmmount;
    this.playersService.getPlayers(this.limit,this.offset).subscribe(
      response =>{
        if(response.length!=0){
          this.players=[]
          console.log(response)
          this.players = response;
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
  getPreviousPlayers(){
    if(this.offset-this.jumpedAmmount>=0){
      if(this.currentRightArrow){
        this.currentRightArrow=false;
      }
    this.offset-= this.jumpedAmmount;
    this.playersService.getPlayers(this.limit,this.offset).subscribe(
      response =>{
        console.log(response)
        this.players = response;
      }
    )
  }
  else{
    this.currentLeftArrow=true;
  }
}

}
