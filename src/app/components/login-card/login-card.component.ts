import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/request/login.interface';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  loginForm: FormGroup;

  @Output()
  accountRequest: EventEmitter<void> = new EventEmitter();

  @Output()
  loginRequest: EventEmitter<LoginRequest> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  clean() {
    this.loginForm.controls['email'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }

  missingAccount() {
    this.accountRequest.emit();
  }

  submit() {
    this.loginRequest.emit({
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    });
  }

}
