import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRippleModule } from '@angular/material/core';


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MainPageRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatRippleModule
  ]
})
export class MainPageModule { }
