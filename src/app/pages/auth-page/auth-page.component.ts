import { Component, OnInit } from '@angular/core';
import { formSlide } from './animations/form-slide.animation';
import { AuthService } from '../../services/auth/auth.service';
import { PlayersService } from '../../services/players/players.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRequest } from '../../interfaces/request/login.interface';
import { Router } from '@angular/router';
import { SignUpRequest } from '../../interfaces/request/signUp.interface';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [formSlide]
})
export class AuthPageComponent implements OnInit {

  currentForm: 'login'|'signup' = 'login';

  loading = false;

  constructor(
    private readonly authService:AuthService,
    private readonly playersService:PlayersService,
    private readonly snackBar: MatSnackBar,
    private readonly router:Router
  ) {}

  ngOnInit(): void {}

  changeForm(newForm: 'login'|'signup') {
    this.currentForm = newForm;
  }

  doLogin(loginRequest:LoginRequest) {
    this.loading = true;
    this.authService.login(loginRequest.email, loginRequest.password)
      .then(() => this.router.navigateByUrl('/'))
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))
      .finally(() => this.loading = false);
  }

  doSignUp(signUpRequest:SignUpRequest) {
    this.loading = true;
    this.playersService.createPlayer(signUpRequest.username, signUpRequest.email, signUpRequest.password)
      .then(player => this.authService.login(player.email, signUpRequest.password))
      .then(() => this.router.navigateByUrl('/'))
      .catch(e => this.snackBar.open(e.error.error, 'OK', { panelClass: ['errorSnackBar'] }))
      .finally(() => this.loading = false);
  }
}
