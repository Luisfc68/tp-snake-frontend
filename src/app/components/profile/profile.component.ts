import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input()
  player!:Player;

  profileImage?:string;

  constructor() { }

  ngOnInit(): void {
    this.profileImage = environment.apiUrl + this.player.image;
  }

  get winRationPercentage() {
    return this.player.winRatio * 100;
  }

}
