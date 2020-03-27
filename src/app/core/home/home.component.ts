import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('state', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'grey',
        transform: 'translateX(100px) scale(0.5)'
      })),
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange'
        }),
        animate(1000, style({
          borderRadius: '50px'
        })),
        animate(500)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  state = 'normal';

  constructor() {
  }

  ngOnInit(): void {
  }

  onShrink() {
    this.state = (this.state === 'normal') ? 'shrunken' :  'normal';
  }

}
