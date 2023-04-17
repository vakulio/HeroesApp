import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArenaComponent } from './arena/arena.component';
import { ScoreComponent } from './score/score.component';
import { AccountComponent } from './account/account.component';

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
    }
  },
  {
    path: 'score',
    component: ScoreComponent,
    data: {
      authOnly: true,
    }
  },
  {
    path: "account",
    component: AccountComponent,
    data: {
      authOnly: true,
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
