import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-9bafb.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get<Recipe[]>('https://ng-recipe-book-9bafb.firebaseio.com/recipes.json')
      .pipe(
        map( (response: Recipe[]) => {
          response.forEach(recipe => !recipe.ingredients && (recipe.ingredients = []));
          return response;
        })
      )
      .subscribe(
        (response: Recipe[]) => {
          this.recipeService.setRecipes(response);
        }
      );
  }
}
