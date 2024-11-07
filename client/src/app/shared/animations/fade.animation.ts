import { trigger, transition, style, state, animate } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition(':enter', [
    animate('500ms ease-in')
  ]),
  transition(':leave', [
    animate('500ms ease-out')
  ])
])
