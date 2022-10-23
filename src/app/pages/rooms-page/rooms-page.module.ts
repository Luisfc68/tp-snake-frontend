import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsPageComponent } from './rooms-page.component';
import { RoomsPageRoutingModule } from './rooms-page-routing.module';
import { GameComponent } from '../../components/game/game.component';
import { SharedModule } from '../../shared/shared.module';
import { ReturnButtonModule } from '../../components/return-button/return-button.module';
import { PaginationButtonsModule } from '../../components/pagination-buttons/pagination-buttons.module';


@NgModule({
  declarations: [
    RoomsPageComponent,
    GameComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoomsPageRoutingModule,
    ReturnButtonModule,
    PaginationButtonsModule
  ]
})
export class RoomsPageModule { }
