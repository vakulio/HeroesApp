import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { CurrentHeroComponent } from './current-hero/current-hero.component';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';


@NgModule({
  declarations: [
    AllHeroesComponent,
    CurrentHeroComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
