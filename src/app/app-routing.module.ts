import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'character-list',
    pathMatch:'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./components/pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'character-list',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-list/characters-list.module'
      ).then((m) => m.CharactersListModule),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import(
        './components/pages/characters/favorites/favorites.module'
      ).then((m) => m.FavoritesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
