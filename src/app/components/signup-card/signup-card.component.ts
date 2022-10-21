import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-card',
  templateUrl: './signup-card.component.html',
  styleUrls: ['./signup-card.component.scss']
})
export class SignupCardComponent implements OnInit {

  signUpForm: FormGroup;

  @Output()
  existingAccount: EventEmitter<void> = new EventEmitter();

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
    console.log('hola')
    console.log(this.signUpForm.controls['password'].invalid)
    console.log(this.signUpForm.controls['username'].value)
    console.log(this.signUpForm.controls['password'].value)
    console.log(this.signUpForm.controls['email'].value)
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
