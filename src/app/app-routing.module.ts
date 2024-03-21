import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
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
    path: 'character-details',
    loadChildren: () =>
      import(
        './components/pages/characters/characters-details/characters-details.module'
      ).then((m) => m.CharactersDetailsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
