import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page-routing.module';
import { SnakeBoardComponent } from '../../components/snake-board/snake-board.component';
import { SharedModule } from '../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [
    GamePageComponent,
    SnakeBoardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GamePageRoutingModule,
    MatChipsModule
  ]
})
export class GamePageModule { }
