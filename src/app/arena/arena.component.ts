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
import { IPowerUps, IPowerup, IUserPowerups } from '../models/powerup.models';
import { POWERUPS } from '../constants/powerups';
import { PowersService } from '../services/powers.service';

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
  userpowerupslist: IPowerup[] = POWERUPS;
  userPower: IUserPowerups = {} as IUserPowerups;
  selectedPower: IPowerup | undefined = undefined;
  selectedPowerDescription: string = '';
  selectedPowerId: keyof IPowerUps | '' = '';

  constructor(
    public battle: BattleService,
    private powerups: PowersService,
    private auth: AngularFireAuth,
    public modal: ModalService,
    private cd: ChangeDetectorRef
  ) {
    auth.user.subscribe((user) => {
      this.user = user;
    });
    this.powerups.getPowerupsData().subscribe((docs) => {
      const powerData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.userPower = powerData[0];
    });
  }

  ngOnInit(): void {
    this.modal.register('winner');
  }

  ngOnDestroy(): void {
    this.modal.unregister('winner');
  }

  selectPower(item: IPowerup) {
    if (!this.battle.battleHero || this.userPower.powerUps[item.id] === 0) {
      return;
    }
    this.selectedPower = item;
    this.selectedPowerId = item.id;
    switch (item.id) {
      case 'armor':
        this.selectedPowerDescription = '+ 50 combat';
        break;
      case 'shield':
        this.selectedPowerDescription = '+ 50 durability';
        break;
      case 'mjolnir':
        this.selectedPowerDescription = '+ 50 power';
        break;
      case 'cloak':
        this.selectedPowerDescription = '+ 50 intelligence';
        break;
      case 'ring':
        this.selectedPowerDescription = '+ 50 strength';
        break;
      case 'boots':
        this.selectedPowerDescription = '+ 50 speed';
        break;
      default:
        this.selectedPowerDescription = '';
    }
  }

  deletePower() {
    this.selectedPower = undefined;
  }

  fightBetweenPlayers(hero: IHero, enemy: IHero) {
    this.battleStarted = true;
    const result = this.battle.fight(
      hero,
      enemy,
      this.selectedPowerId as string
    );
    this.result = result;
    if (result.name === hero.name && this.selectedPowerId !== '') {
      this.userPower = {
        ...this.userPower,
        money: this.userPower.money + 10,
        powerUps: {
          ...this.userPower.powerUps,
          [this.selectedPowerId]:
            this.userPower.powerUps[this.selectedPowerId] - 1,
        },
      };
      this.powerups.saveUserPowers(this.userPower);
    }
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
