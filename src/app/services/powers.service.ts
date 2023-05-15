import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';
import { IUser } from '../models/user.models';
import { IUserPowerups } from '../models/powerup.models';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { documentId } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class PowersService {
  public powerupsCollection: AngularFirestoreCollection<IUserPowerups>;
  public userCollection: AngularFirestoreCollection<IUser>;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) {
    this.powerupsCollection = db.collection('powerups');
    this.userCollection = db.collection('users');
  }

  saveUserPowers(data: IUserPowerups) {
    this.auth.user.subscribe((user) => {
      if (!user) {
        return;
      }
      const query = this.powerupsCollection.doc(user.uid).set(data);
      return query;
    });
  }

  public getPowerupsData() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of({});
        }
        const query = this.powerupsCollection.ref.where(
          documentId(),
          '==',
          user.uid
        );
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IUserPowerups>).docs)
    );
  }
}
