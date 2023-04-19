import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { CurrentHeroComponent } from './current-hero/current-hero.component';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'all-heroes',
    component: AllHeroesComponent,
    data: {
      authOnly: true,
    },
    canActivate: [AngularFireAuthGuard]
  },
  {
    path: 'hero/:id',
    component: CurrentHeroComponent,
    canActivate: [AngularFireAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
