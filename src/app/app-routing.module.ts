import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArenaComponent } from './arena/arena.component';
import { ScoreComponent } from './score/score.component';
import { AccountComponent } from './account/account.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PowerUpsComponent } from './power-ups/power-ups.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'arena',
    component: ArenaComponent,
    data: {
      authOnly: true,
    },
  },
  {
    path: 'score',
    component: ScoreComponent,
    data: {
      authOnly: true,
    },
  },
  {
    path: 'account',
    component: AccountComponent,
    data: {
      authOnly: true,
    },
  },
  {
    path: 'shop',
    component: PowerUpsComponent,
    data: {
      authOnly: true,
    },
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
