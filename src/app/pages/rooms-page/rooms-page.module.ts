import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomsPageComponent } from './rooms-page.component';
import { RoomsPageRoutingModule } from './rooms-page-routing.module';


@NgModule({
  declarations: [
    RoomsPageComponent
  ],
  imports: [
    CommonModule,
    RoomsPageRoutingModule
  ]
})
export class RoomsPageModule { }
