import {Component, OnInit} from '@angular/core';
import {Credentials} from '../assets/credentials';
import {initializeApp} from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'complete-guide';

  ngOnInit(): void {
    initializeApp(Credentials.FIREBASE_CONFIG);
  }
}
