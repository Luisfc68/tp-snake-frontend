import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ImgFallbackModule } from '../directives/img-fallback/img-fallback.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImgFallbackModule,
    MatProgressBarModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImgFallbackModule,
    MatProgressBarModule
  ]
})
export class SharedModule { }
