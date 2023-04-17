import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { CurrentHeroComponent } from './current-hero/current-hero.component';



@NgModule({
  declarations: [
    AllHeroesComponent,
    CurrentHeroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
