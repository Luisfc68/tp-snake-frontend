import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { LoginCardComponent } from '../../components/login-card/login-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SignupCardComponent } from '../../components/signup-card/signup-card.component';
import { SharedModule } from '../../shared/shared.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AuthPageComponent,
    LoginCardComponent,
    SignupCardComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    AuthPageRoutingModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule
  ]
})
export class AuthPageModule { }
