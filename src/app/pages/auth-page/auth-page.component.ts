import { Component, OnInit } from '@angular/core';
import { formSlide } from './animations/form-slide.animation';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  animations: [formSlide]
})
export class AuthPageComponent implements OnInit {

  currentForm: 'login'|'signup' = 'login';

  constructor() { }

  ngOnInit(): void {}

  changeForm(newForm: 'login'|'signup') {
    this.currentForm = newForm;
  }
}
