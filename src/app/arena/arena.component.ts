import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BattleService } from '../services/battle.service';
import { IHero } from '../models/hero.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaComponent {
  user: firebase.User | null = null;
  constructor(public battle: BattleService, private auth: AngularFireAuth) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
  }
  battleStarted = false;

  fightBetweenPlayers(hero: IHero, enemy: IHero) {
    this.battleStarted = true;
    const result = this.battle.fight(hero, enemy);
    this.saveBattle(hero, enemy, result.name);
    setTimeout(() => {
      this.battleStarted = false;
      alert(result.name);
    }, 5000);
  }

  async saveBattle(hero: IHero, enemy: IHero, result: string) {
    const battle = {
      userId: this.user?.uid as string,
      userName: this.user?.displayName as string,
      heroName: hero.name,
      heroId: hero.id,
      enemyName: enemy.name,
      enemyId: enemy.id,
      timestamp: new Date(),
      result: result,
    };

    await this.battle.saveBattle(battle);
  }
}
