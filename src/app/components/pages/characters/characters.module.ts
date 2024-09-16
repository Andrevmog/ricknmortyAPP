import { RouterModule } from '@angular/router';
import { CharactersDetailsComponent } from './characters-details/characters-details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { CharactersListComponent } from './characters-list/characters-list.component';
import { FormSearchComponent } from '@app/shared/components/form-search/form-search.component';
@NgModule({
  declarations: [
    CharactersDetailsComponent,
    CharactersListComponent,
    FormSearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule
  ],
  exports: [
    CharactersDetailsComponent,
    CharactersListComponent,
  ],
})
export class CharactersModule { }
