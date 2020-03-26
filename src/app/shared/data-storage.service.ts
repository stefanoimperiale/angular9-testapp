import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, switchMap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    return this.http.put('https://ng-recipe-book-9bafb.firebaseio.com/recipes.json',
      this.recipeService.getRecipes());
    // REPORT PROGRESS (1 UPLOAD, 3 DOWNLOAD)
    // const req = new HttpRequest('PUT',
    //   'https://ng-recipe-book-9bafb.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(),
    //   {
    //     reportProgress: true,
    //     params: new HttpParams().set('auth', '')
    //   });
    // return this.http.request(req);
  }

  getRecipes() {
    this.authService.getToken().pipe(
      switchMap(
        (token: string) =>
          this.http.get<Recipe[]>(
            'https://ng-recipe-book-9bafb.firebaseio.com/recipes.json',
            {params: new HttpParams().set('auth', token)})
      ),
      map(
        (response: Recipe[]) => {
          response.forEach(recipe => !recipe.ingredients && (recipe.ingredients = []));
          return response;
        })
    ).subscribe(
      (response: Recipe[]) => {
        this.recipeService.setRecipes(response);
      }
    );
  }
}
