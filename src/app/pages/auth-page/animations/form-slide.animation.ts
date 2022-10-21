import { trigger, transition, animate, style, state } from '@angular/animations';

export const formSlide = trigger('formSlide', [
  state('login', style({ transform: 'translateX(0%)'})),
  state('signup', style({ transform: 'translateX(-100%)'})),
  transition('* => *', animate(600))
])
