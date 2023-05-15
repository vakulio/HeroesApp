import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BattleService } from '../services/battle.service';
import { IHero } from '../models/hero.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArenaComponent implements OnInit, OnDestroy {
  user: firebase.User | null = null;
  battleStarted = false;
  result: IHero = {} as IHero;

  constructor(
    public battle: BattleService,
    private auth: AngularFireAuth,
    public modal: ModalService,
    private cd: ChangeDetectorRef
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.modal.register('winner');
  }

  ngOnDestroy(): void {
    this.modal.unregister('winner');
  }

  fightBetweenPlayers(hero: IHero, enemy: IHero) {
    this.battleStarted = true;
    const result = this.battle.fight(hero, enemy);
    this.result = result;
    this.saveBattle(hero, enemy, result.name);
    setTimeout(() => {
      this.battleStarted = false;
      this.modal.toggleModal('winner');
      this.cd.detectChanges();
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
