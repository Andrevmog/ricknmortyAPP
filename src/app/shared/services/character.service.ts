import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../components/interface/character.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, Subject, catchError, map, of, switchMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private favorites: number[] = [];
  private favoritesCount: number = 0;
  favorites$ = new BehaviorSubject<number[]>([]);
  favoritesCount$ = new Subject<number>();


  constructor(private http: HttpClient) {
    this.loadFavoritesFromStorage();
   }

  searchCharacters(query = '', page = 1) {
    return this.http.get<Character[]>(
      `${environment.baseUrlAPI}/?name=${query}&page=${page}`
    )
  }

  addFavorite(id: number): void {
    if (!this.favorites.includes(id)) {
      this.favorites = [...this.favorites, id];
      this.favoritesCount = this.favorites.length;
      this.saveFavoritesToStorage();
      this.favorites$.next(this.favorites);
      this.favoritesCount$.next(this.favoritesCount);
    }
  }

  removeFavorite(id: number): void {
    this.favorites = this.favorites.filter(favorite => favorite !== id);
    this.favoritesCount = this.favorites.length;
    this.saveFavoritesToStorage();
    this.favorites$.next(this.favorites);
    this.favoritesCount$.next(this.favoritesCount);
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private loadFavoritesFromStorage(): number[] {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
      this.favoritesCount = this.favorites.length;
      this.favorites$.next(this.favorites);
      this.favoritesCount$.next(this.favoritesCount);
    }
    return this.favorites;
  }

  searchFavorites(): Observable<Character[]> {
    this.loadFavoritesFromStorage();
    return this.favorites$.pipe(
      take(1),
      switchMap(ids => {
        console.log('IDs recebidos:', ids);

        if (!ids || ids.length === 0) {
          return of([]);
        }

        const idsQuery = ids.join(',');
        const url = `${environment.baseUrlAPI}${idsQuery}`;
        console.log('URL gerada:', url);

        return this.http.get<Character[]>(url).pipe(
          catchError(error => {
            console.error('Erro na requisição HTTP:', error);
            return of([]);
          })
        );
      })
    );
  }

}
