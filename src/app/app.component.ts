import {Component, OnInit} from '@angular/core';
import {Credentials} from '../assets/credentials';
import {initializeApp} from 'firebase/app';
import {routerTransition} from './animations/list.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    routerTransition
  ]
})
export class AppComponent implements OnInit {
  title = 'complete-guide';

  ngOnInit(): void {
    initializeApp(Credentials.FIREBASE_CONFIG);
  }

  getState(outlet) {
    return  outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
