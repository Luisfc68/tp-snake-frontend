import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationButtonsComponent } from './pagination-buttons.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    PaginationButtonsComponent
  ],
  exports: [
    PaginationButtonsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PaginationButtonsModule { }
