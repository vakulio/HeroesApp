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
export class BattleService  {
  public battleCollection: AngularFirestoreCollection<IBattle>;
  public userCollection: AngularFirestoreCollection<IUserDB>;
  battleHero: IHero | null = null
  battles: IBattle[] = []
  pendingReq = false

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth,
    ) {
    this.battleCollection = db.collection('battles');
    this.userCollection = db.collection('users');
  }

  chooseBattleHero(hero: IHero | null) {
    this.battleHero = hero
  }

  saveBattle(data: IBattle): Promise<DocumentReference<IBattle>> {
    return this.battleCollection.add(data);
  }



  getUserBattles(sort$: BehaviorSubject<string>) {
    return combineLatest([
      this.auth.user, sort$
    ]).pipe(
      switchMap(values => {
        const [user, sort] = values
        if(!user) {
          return of([])
        }
        const query = this.battleCollection.ref.where(
          'uid', '==', user.uid
        ).orderBy(
          'timestamp', sort === '1' ? 'desc' : 'asc'
        )

        return query.get()

      }),
      map(snapshot => (snapshot as QuerySnapshot<IBattle>).docs
      )
    )
  }


  async getBattles() {
    if(this.pendingReq) {
      return
    }

    this.pendingReq = true

    let query = this.battleCollection.ref.orderBy('timestamp', 'desc').limit(25)
    const { length } = this.battles

    if(length) {
      const lastDocId = this.battles[length - 1].docID
      const lastDoc = this.battleCollection.doc(lastDocId).get().toPromise()
      query = query.startAfter(lastDoc)
    }

    const snapshot = await query.get()
    snapshot.forEach(doc => {
      this.battles.push({
        docID: doc.id,
        ...doc.data()
      })
    })
    this.pendingReq = false
  }

}
