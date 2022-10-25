import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpRequest } from '../../interfaces/request/signUp.interface';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.scss']
})
export class SignupCardComponent implements OnInit {

  signUpForm: FormGroup;

  @Output()
  existingAccount: EventEmitter<void> = new EventEmitter();

  @Output()
  signUpRequest: EventEmitter<SignUpRequest> = new EventEmitter()

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.signUpForm = formBuilder.group({
      username: ['', [Validators.required, Validators.min(4)]],
      password: ['', [Validators.required, Validators.min(4)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  notifyExistingAccount() {
    this.existingAccount.emit();
  }

  clean() {
    this.signUpForm.controls['username'].setValue('');
    this.signUpForm.controls['email'].setValue('');
    this.signUpForm.controls['password'].setValue('');
  }

  submit() {
    this.signUpRequest.emit({
      username: this.signUpForm.controls['username'].value,
      email: this.signUpForm.controls['email'].value,
      password: this.signUpForm.controls['password'].value
    });
  }

  getErrorMessage(fieldName:string): string {
    const errorMessages:{ [key:string]:string } = {
      username: 'Should be 4 characters long at least',
      email: 'Should have valid email format',
      password: 'Should be 4 characters long at least'
    }
    return errorMessages[fieldName] || '';
  }

}
