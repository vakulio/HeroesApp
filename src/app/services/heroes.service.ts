import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { HeroResponse, IHero } from '../models/hero.models';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroes: IHero[] = [];
  selectedHeroes: IHero[] = [];
  get lastSelectedHero(): IHero {
    return this.selectedHeroes[this.selectedHeroes.length - 1];
  }

  constructor(private http: HttpClient) {}

  loadHeroes(query: string, cd: ChangeDetectorRef): void {
    this.http
      .get<HeroResponse>(
        `/api/search/${query}`
      )
      .pipe(
        map((response) => {
          return response.results;
        })
      )
      .pipe(finalize(() => cd.markForCheck()))
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }
}
