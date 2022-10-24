import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ImgFallbackModule } from '../directives/img-fallback/img-fallback.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImgFallbackModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImgFallbackModule
  ]
})
export class SharedModule { }
