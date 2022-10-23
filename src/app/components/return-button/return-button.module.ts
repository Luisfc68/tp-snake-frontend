import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnButtonComponent } from './return-button.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ReturnButtonComponent
  ],
  exports: [
    ReturnButtonComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ReturnButtonModule { }
