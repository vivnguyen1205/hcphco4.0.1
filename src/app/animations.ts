import { trigger, transition, style, animate } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('LoginPage <=> HomePage', [
      style({ position: 'relative' }),
      style({ opacity: 0, transform: 'translateX(-100%)' }),
      animate('0.5s ease-out', style({ opacity: 1, transform: 'translateX(0%)' }))
    ])
  ]);
