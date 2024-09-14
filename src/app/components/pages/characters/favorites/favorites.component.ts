import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '@app/shared/components/interface/character.interface';
import { CharacterService } from '@shared/services/character.service';
import { Observable, take } from 'rxjs';

type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  characters: Character[] = [];

  info: RequestInfo = {
    next: '',
  };

  constructor(
    private characterSvc: CharacterService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getDataFromService();
  }

  private getDataFromService(): void {
    this.characterSvc
      .searchFavorites()
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res?.length) {
          this.characters = [...res];
        } else {
          this.characters = [];
        }
      }, (error) => console.log((error.friendlyMessage)));
  }

}
