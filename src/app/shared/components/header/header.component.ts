import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterService } from '@shared/services/character.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public url1: string = "";
  favoritesCount: number = 0;

  constructor(
    public router: Router,
    private characterSvc: CharacterService,
  ) {
    this.favoritesCount = parseInt(localStorage.getItem('favoritesCount') ?? '0', 10)
  }

  ngOnInit(): void {
    this.loadFavoritesFromStorage();
  }

  private loadFavoritesFromStorage(): void {
    this.characterSvc.favoritesCount$.subscribe(count => {
      this.favoritesCount = count;
    });
  }

}
