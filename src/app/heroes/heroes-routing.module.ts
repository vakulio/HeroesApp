import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { CurrentHeroComponent } from './current-hero/current-hero.component';

const routes: Routes = [
  {
    path: 'allHeroes',
    component: AllHeroesComponent
  },
  {
    path: 'hero',
    component: CurrentHeroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
