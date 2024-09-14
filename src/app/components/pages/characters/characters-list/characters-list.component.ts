import {
  Component, HostListener, Inject, OnInit,
} from '@angular/core';
import {
  ActivatedRoute, NavigationEnd, ParamMap, Params, Router,
} from '@angular/router';

import { filter, take } from 'rxjs/operators';
import { CharacterService } from '@shared/services/character.service';
import { Character } from '@app/shared/components/interface/character.interface';
import { BehaviorSubject } from 'rxjs';

type RequestInfo = {
  next: string;
};
@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.scss'],
})

export class CharactersListComponent implements OnInit {
  characters: Character[] = [];

  info: RequestInfo = {
    next: '',
  };

  private pageNum = 1;
  private favorites: number[] = [];

  private query: string | undefined;

  constructor(
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.onUrlChanged();
  }

  ngOnInit(): void {
    this.getCharactersByQuery();
    this.loadFavoritesFromStorage()
  }

  private loadFavoritesFromStorage(): number[] {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
    return this.favorites;
  }

  isFavorite(id: number): boolean {
    return this.favorites.includes(id);
  }

  addFavorite(id: number){
    this.characterSvc.addFavorite(id)
    this.loadFavoritesFromStorage()
  }

  removeFavorite(id: number){
    this.characterSvc.removeFavorite(id)
    this.loadFavoritesFromStorage()
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParamMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params.get('q') ?? undefined;
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchCharacters(this.query, this.pageNum)
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.results?.length) {
          const { info, results } = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
      }, (error) => console.log((error.friendlyMessage)));
  }
}
