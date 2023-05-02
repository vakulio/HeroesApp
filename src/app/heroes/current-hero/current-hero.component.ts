import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IHero } from 'src/app/models/hero.models';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-current-hero',
  templateUrl: './current-hero.component.html',
  styleUrls: ['./current-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentHeroComponent implements OnInit, OnDestroy {

  constructor(
    public route: ActivatedRoute,
    public heroService: HeroesService,
    private changeDetection: ChangeDetectorRef
    ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
          this.heroService.getHero(params['id'], this.changeDetection)
      })
  }

  ngOnDestroy(): void {
    this.heroService.hero = {} as IHero;
  }

}
