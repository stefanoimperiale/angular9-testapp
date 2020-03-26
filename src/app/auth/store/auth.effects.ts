import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {LOGOUT, SET_TOKEN, SIGNIN, SIGNUP, TRY_SIGNIN, TRY_SIGNUP, TrySignup} from './auth.actions';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {from} from 'rxjs';
import {fromPromise} from 'rxjs/internal-compatibility';
import {auth} from 'firebase';
import {Router} from '@angular/router';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$.pipe(
    ofType(TRY_SIGNUP),
    map((action: TrySignup) => action.payload),
    switchMap((authData: { username: string, password: string }) =>
      fromPromise(auth().createUserWithEmailAndPassword(authData.username, authData.password))
    ),
    switchMap(_ =>
      fromPromise(auth().currentUser.getIdToken())
    ),
    mergeMap((token: string) => [
      {
        type: SIGNUP,
      },
      {
        type: SET_TOKEN,
        payload: token
      }]
    )
  );

  @Effect()
  authSignin = this.actions$
    .pipe(
      ofType(TRY_SIGNIN),
      map((action: TrySignup) => action.payload),
      switchMap((authData: { username: string, password: string }) =>
        fromPromise(auth().signInWithEmailAndPassword(authData.username, authData.password))
      ),
      switchMap(_ =>
        fromPromise(auth().currentUser.getIdToken())
      ),
      mergeMap((token: string) => {
        this.router.navigate(['/']);
        return [
          {
            type: SIGNIN,
          },
          {
            type: SET_TOKEN,
            payload: token
          }];
      })
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .pipe(
      ofType(LOGOUT),
      tap(_ =>
        this.router.navigate(['/'])
      ),
    );

  constructor(private actions$: Actions,
              private router: Router) {
  }
}
