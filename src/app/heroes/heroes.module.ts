import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { CurrentHeroComponent } from './current-hero/current-hero.component';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { HeroComponent } from './hero/hero.component';
import { AddPercentPipe } from './pipes/add-percent.pipe';
import { PowerStatItemComponent } from './shared/power-stat-item/power-stat-item.component';


@NgModule({
  declarations: [
    AllHeroesComponent,
    CurrentHeroComponent,
    HeroComponent,
    AddPercentPipe,
    PowerStatItemComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkAccordionModule
  ],
  exports: [PercentPipe],
  providers: [PercentPipe]
})
export class HeroesModule { }
