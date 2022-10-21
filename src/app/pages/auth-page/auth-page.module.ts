import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoginCardComponent } from '../../components/login-card/login-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SignupCardComponent } from '../../components/signup-card/signup-card.component';


@NgModule({
  declarations: [
    AuthPageComponent,
    LoginCardComponent,
    SignupCardComponent
  ],
  imports: [
    CommonModule,
    AuthPageRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatInputModule
  ]
})
export class AuthPageModule { }
