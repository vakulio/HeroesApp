import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { CurrentHeroComponent } from './current-hero/current-hero.component';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllHeroesComponent,
    CurrentHeroComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }