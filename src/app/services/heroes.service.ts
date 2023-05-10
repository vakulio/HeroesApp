import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { finalize, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HeroResponse, IHero } from '../models/hero.models';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroes: IHero[] = [];
  hero: IHero = {} as IHero;
  selectedHeroes: IHero[] = [];
  get lastSelectedHero(): IHero {
    return this.selectedHeroes[this.selectedHeroes.length - 1];
  }

  constructor(private http: HttpClient) {}

  loadHeroes(query: string) {
    return this.http
      .get<HeroResponse>(`/app/api/${environment.apiToken}/search/${query}`)
      .pipe(
        map((response) => {
          return response.results;
        })
      )
      .subscribe((heroes) => {
        this.heroes = heroes;
      });
  }

  getHero(query: string) {
    return this.http
      .get<IHero>(`/app/api/${environment.apiToken}/${query}`)
      .pipe(
        map((response) => {
          return response;
        })
      )
      .pipe(
        tap((hero) => {
          this.hero = hero;
        })
      );
  }
}
