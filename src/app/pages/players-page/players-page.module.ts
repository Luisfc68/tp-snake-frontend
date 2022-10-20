import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersPageComponent } from './players-page.component';
import { PlayersPageRoutingModule } from './players-page-routing.module';


@NgModule({
  declarations: [
    PlayersPageComponent
  ],
  imports: [
    CommonModule,
    PlayersPageRoutingModule
  ]
})
export class PlayersPageModule { }
