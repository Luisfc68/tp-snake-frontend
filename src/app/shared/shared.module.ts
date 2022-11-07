import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
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
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    ImgFallbackModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
