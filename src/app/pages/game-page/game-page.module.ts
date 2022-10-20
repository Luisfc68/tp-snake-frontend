import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page-routing.module';


@NgModule({
  declarations: [
    GamePageComponent
  ],
  imports: [
    CommonModule,
    GamePageRoutingModule
  ]
})
export class GamePageModule { }
