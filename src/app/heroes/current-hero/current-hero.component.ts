import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IHero } from 'src/app/models/hero.models';
import { HeroesService } from 'src/app/services/heroes.service';
import { AddPercentPipe } from '../pipes/add-percent.pipe';
import { BattleService } from 'src/app/services/battle.service';

@Component({
  selector: 'app-current-hero',
  templateUrl: './current-hero.component.html',
  styleUrls: ['./current-hero.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AddPercentPipe]
})
export class CurrentHeroComponent implements OnInit, OnDestroy {

  hero: IHero = {} as IHero;
  constructor(
    public route: ActivatedRoute,
    public heroService: HeroesService,
    private changeDetection: ChangeDetectorRef,
    public battle: BattleService
    ) {}

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
          this.heroService.getHero(params['id']).subscribe().add(() => this.changeDetection.markForCheck)

      })
  }

  ngOnDestroy(): void {
    this.heroService.hero = {} as IHero;
  }

  toggleHero(hero: IHero): void {
    if(hero.id === this.battle.battleHero?.id){
      this.battle.chooseBattleHero(null)
      return
    }
    this.battle.chooseBattleHero(hero)
  }

}
