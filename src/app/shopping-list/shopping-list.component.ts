import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {StartEdit} from './store/shopping-list.actions';
import {AppState} from '../store/app.reducers';
import {slideIn} from '../animations/list.animation';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    slideIn
  ]
})
export class ShoppingListComponent implements OnInit {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
   this.store.dispatch(new StartEdit(index));
  }
}
