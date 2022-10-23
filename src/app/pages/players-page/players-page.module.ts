import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersPageComponent } from './players-page.component';
import { PlayersPageRoutingModule } from './players-page-routing.module';
import { ProfileComponent } from '../../components/profile/profile.component';
import { SharedModule } from '../../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { PaginationButtonsModule } from '../../components/pagination-buttons/pagination-buttons.module';


@NgModule({
  declarations: [
    PlayersPageComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PlayersPageRoutingModule,
    MatIconModule,
    PaginationButtonsModule
  ]
})
export class PlayersPageModule { }
