import {auth} from 'firebase/app';
import 'firebase/auth';
import {from, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  private token: string;

  constructor(private router: Router) {
  }

  signupUser(email: string, password: string) {
   auth().createUserWithEmailAndPassword(email, password)
      .catch(
        error => console.log(error)
      );
  }

  signinUser(email: string, password: string) {
    auth().signInWithEmailAndPassword(email, password)
      .then(
        _ => {
          this.router.navigate(['/']);
          auth().currentUser.getIdToken().then(token => this.token = token);
        }
      ).catch(
        error => console.log(error)
      );
  }

  getToken(): Observable<string> {
    return from(auth().currentUser.getIdToken().then(token => this.token = token));
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    auth().signOut();
    this.token = null;
  }
}
