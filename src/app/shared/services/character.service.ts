import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../components/interface/character.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  searchCharacters(query = '', page = 1) {
    return this.http.get<Character[]>(
      `${environment.baseUrlAPI}/?name=${query}&page=${page}`
      )
  }
  setFavorites(id: number) {
    // TODO
  }
}
