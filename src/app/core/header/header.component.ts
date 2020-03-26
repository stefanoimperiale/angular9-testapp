import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs';
import * as fromAuthState from '../../auth/store/auth.reducers';
import {Logout} from '../../auth/store/auth.actions';
import {FetchRecipes, StoreRecipes} from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  authState: Observable<fromAuthState.State>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.authState = this.store.select(state => state.auth);
  }

  onSaveData() {
   this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
