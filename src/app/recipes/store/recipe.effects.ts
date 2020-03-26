import {Actions, Effect, ofType} from '@ngrx/effects';
import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Recipe} from '../recipe.model';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {FeatureState} from './recipe.reducers';

@Injectable()
export class RecipeEffects {
  @Effect()
  recipeFetch = this.actions$
    .pipe(
      ofType(FETCH_RECIPES),
      switchMap((action: FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-9bafb.firebaseio.com/recipes.json')
          .pipe(
            map(
              (response: Recipe[]) => {
                response.forEach(recipe => !recipe.ingredients && (recipe.ingredients = []));
                return {
                  type: SET_RECIPES,
                  payload: response,
                };
              })
          );
      })
    );

  @Effect()
  recipeStore = this.actions$
    .pipe(
      ofType(STORE_RECIPES),
      withLatestFrom(this.store.select(state => state.recipes)),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT',
          'https://ng-recipe-book-9bafb.firebaseio.com/recipes.json',
          state.recipes,
          {reportProgress: true,});
        return this.httpClient.request(req);
      }),
    );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<FeatureState>) {
  }
}
