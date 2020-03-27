import {animate, group, keyframes, state, style, transition, trigger, query, animateChild} from '@angular/animations';

export const slideIn = trigger('slideIn', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  transition('void => *', [
    animate(1000, keyframes([
      style({
        transform: 'translate(-100px)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'translateX(-50px)',
        opacity: 0.5,
        offset: 0.3
      }),
      style({
        transform: 'translateX(-20px)',
        opacity: 1,
        offset: 0.8
      }),
      style({
        transform: 'translateX(0px)',
        opacity: 1,
        offset: 1
      })
    ]))
  ]),
  transition('* => void', [
    group([
      animate(300, style({
        color: 'red'
      })),
      animate(800, style({
        transform: 'translateX(100px)',
        opacity: 0
      }))
    ])
  ])
]);

export const routerTransition =
  trigger('routerTransition', [
    transition('HomePage <=> ShoppingListPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    transition('* <=> LazyPage', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('200ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
