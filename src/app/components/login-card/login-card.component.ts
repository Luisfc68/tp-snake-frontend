import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit {

  loginForm: FormGroup;

  @Output()
  accountRequest: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.loginForm = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  clean() {
    this.loginForm.controls['username'].setValue('');
    this.loginForm.controls['password'].setValue('');
  }

  missingAccount() {
    this.accountRequest.emit();
  }

  submit() {
    console.log('hola')
    console.log(this.loginForm.controls['username'].value)
    console.log(this.loginForm.controls['password'].value)
  }

}
