import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { of, BehaviorSubject, combineLatest } from 'rxjs'
import { IBattle } from '../models/battle.models';
import { IUserDB } from '../models/user.models';
import { IHero } from '../models/hero.models';

@Injectable({
  providedIn: 'root',
})
export class BattleService {
  public battleCollection: AngularFirestoreCollection<IBattle>;
  public userCollection: AngularFirestoreCollection<IUserDB>;
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

  getUserBattles(sort$: BehaviorSubject<string>) {
    return combineLatest([this.auth.user, sort$]).pipe(
      switchMap((values) => {
        const [user, sort] = values;
        if (!user) {
          return of([]);
        }
        const query = this.battleCollection.ref.where('userId', '==', user.uid);
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IBattle>).docs)
    );
  }

  async getBattles() {
    if (this.pendingReq) {
      return;
    }

    this.pendingReq = true;

    let query = this.battleCollection.ref
      .orderBy('timestamp', 'desc')
      .limit(25);
    const { length } = this.battles;

    if (length) {
      const lastDocId = this.battles[length - 1].docID;
      const lastDoc = this.battleCollection.doc(lastDocId).get().toPromise();
      query = query.startAfter(lastDoc);
    }

    const snapshot = await query.get();
    snapshot.forEach((doc) => {
      this.battles.push({
        docID: doc.id,
        ...doc.data(),
      });
    });
    this.pendingReq = false;
  }

  fight(hero: IHero, enemy: IHero) {
    const heroPower = this.calculatePower(hero);
    const enemyPower = this.calculatePower(enemy);

    if (
      heroPower > enemyPower ||
      (heroPower == enemyPower && Math.random() < 0.5)
    ) {
      return hero;
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
