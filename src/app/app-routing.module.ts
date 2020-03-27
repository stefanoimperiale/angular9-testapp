import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {HomeComponent} from './core/home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent, data: {animation: 'HomePage'}},
  {
    path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(mod => mod.RecipesModule),
    data: {animation: 'LazyPage'}
  }, // Lazy loading
  {path: 'shopping-list', component: ShoppingListComponent, data: {animation: 'ShoppingListPage'}},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled'})], // load all module on startup
  exports: [RouterModule]
})
export class AppRoutingModule {

}
