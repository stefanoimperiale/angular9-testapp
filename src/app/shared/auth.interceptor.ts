import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {switchMap, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);
    return this.store.select(state => state.auth.token)
      .pipe(
        take(1), // otherwise every time the state is changed, the request is sent
        switchMap(token => {
          const copiedReq = req.clone({params: req.params.set('auth', token)});
          return next.handle(copiedReq);
        })
      );
  }

}
