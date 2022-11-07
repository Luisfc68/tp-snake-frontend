import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamePageComponent } from './game-page.component';
import { GamePageRoutingModule } from './game-page-routing.module';
import { SnakeBoardComponent } from '../../components/snake-board/snake-board.component';
import { SharedModule } from '../../shared/shared.module';
import { MatChipsModule } from '@angular/material/chips';
import { EndDialogComponent } from '../../components/end-dialog/end-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    GamePageComponent,
    EndDialogComponent,
    SnakeBoardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    GamePageRoutingModule,
    MatChipsModule,
    MatDialogModule
  ]
})
export class GamePageModule { }
