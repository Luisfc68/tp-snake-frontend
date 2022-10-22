import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../../interfaces/player.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @Input()
  player!:Player;

  constructor() { }

  ngOnInit(): void {}

  get winRationPercentage() {
    return this.player.winRatio * 100;
  }

}
