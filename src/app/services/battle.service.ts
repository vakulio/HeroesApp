import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { IBattle } from '../models/battle.models';
import { IUser } from '../models/user.models';
import { IHero } from '../models/hero.models';
import { IUserPowerups } from '../models/powerup.models';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  public battleCollection: AngularFirestoreCollection<IBattle>;
  public userCollection: AngularFirestoreCollection<IUser>;
  battleHero: IHero | null = null;
  battleEnemy: IHero | null = null;
  battles: IBattle[] = [];
  pendingReq = false;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.battleCollection = db.collection('battles');
    this.userCollection = db.collection('users');
  }

  chooseBattleHero(hero: IHero | null) {
    this.battleHero = hero;
  }

  chooseBattleEnemy(hero: IHero | null) {
    this.battleEnemy = hero;
  }

  saveBattle(data: IBattle): Promise<DocumentReference<IBattle>> {
    return this.battleCollection.add(data);
  }

  getUserBattles() {
    return combineLatest([this.auth.user]).pipe(
      switchMap((values) => {
        const [user] = values;
        if (!user) {
          return of([]);
        }
        const query = this.battleCollection.ref.where('userId', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBattle>).docs)
    );
  }

  async getBattles(sort: string) {
    let query = this.battleCollection.ref
      .orderBy('timestamp', sort === 'desc' ? 'asc' : 'desc')
      .limit(50);

    const snapshot = await query.get();
    return snapshot;
  }

  fight(hero: IHero, enemy: IHero, powerUp?: string) {
    const heroCopy = { ...hero };
    let { powerstats } = heroCopy;
    console.log(powerUp);
    if (powerUp) {
      switch (powerUp) {
        case 'armor':
          powerstats.combat = (Number(powerstats.combat) + 50).toString();
          break;
        case 'shield':
          powerstats.durability = (
            Number(powerstats.durability) + 50
          ).toString();
          break;
        case 'mjolnir':
          powerstats.power = (Number(powerstats.power) + 50).toString();
          break;
        case 'cloak':
          powerstats.intelligence = (
            Number(powerstats.intelligence) + 50
          ).toString();
          break;
        case 'ring':
          powerstats.strength = (Number(powerstats.strength) + 50).toString();
          break;
        case 'boots':
          powerstats.speed = (Number(powerstats.speed) + 50).toString();
          break;
        default:
          return heroCopy;
      }
    }

    const heroPower = this.calculatePower(heroCopy);
    const enemyPower = this.calculatePower(enemy);

    if (
      heroPower > enemyPower ||
      (heroPower == enemyPower && Math.random() < 0.5)
    ) {
      return heroCopy;
    } else {
      return enemy;
    }
  }

  calculatePower(character: IHero) {
    const intelligenceWeight = 0.2;
    const strengthWeight = 0.3;
    const speedWeight = 0.1;
    const staminaWeight = 0.1;
    const powerWeight = 0.2;
    const combatWeight = 0.1;

    const power =
      Number(character.powerstats.intelligence) * intelligenceWeight +
      Number(character.powerstats.strength) * strengthWeight +
      Number(character.powerstats.speed) * speedWeight +
      Number(character.powerstats.durability) * staminaWeight +
      Number(character.powerstats.power) * powerWeight +
      Number(character.powerstats.combat) * combatWeight;

    return power;
  }
}
