import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore'
import { IUser } from '../models/user.models';
import { Observable, combineLatest, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { documentId } from 'firebase/firestore';
import { IUserPowerups } from '../models/powerup.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userCollections: AngularFirestoreCollection<IUser>;
  private powerUpCollections: AngularFirestoreCollection<IUserPowerups>;
  public isAuth$: Observable<boolean>;
  public isAuthWithDelay$: Observable<boolean>;
  private redirect = false;

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userCollections = db.collection('users');
    this.powerUpCollections = db.collection('powerups');
    this.isAuth$ = auth.user.pipe(map((user) => !!user));
    this.isAuthWithDelay$ = this.isAuth$.pipe(delay(1000));
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((e) => this.route.firstChild),
        switchMap((route) => route?.data ?? of())
      )
      .subscribe((data) => {
        this.redirect = data['authOnly'] ?? false;
      });
  }

  public async createUser(userData: IUser) {
    if (!userData.password) {
      throw new Error('Password not provided!');
    }

    const userCreds = await this.auth.createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );

    if (!userCreds.user) {
      throw new Error("User can't be found");
    }

    await this.userCollections.doc(userCreds.user?.uid).set({
      name: userData.name,
      email: userData.email,
    });

    await this.powerUpCollections.doc(userCreds.user?.uid).set({
      money: 50,
      powerUps: {
        shield: 0,
        mjolnir: 0,
        armor: 0,
        cloak: 0,
        ring: 0,
        boots: 0,
      },
    });

    await userCreds.user.updateProfile({
      displayName: userData.name,
    });
  }

  public async logout($event?: Event) {
    if ($event) {
      $event.preventDefault();
    }

    await this.afAuth.signOut();
    if (this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }

  public getUserData() {
    return this.auth.user.pipe(
      switchMap((user) => {
        if (!user) {
          return of([]);
        }
        const query = this.userCollections.ref.where(
          documentId(),
          '==',
          user.uid
        );
        return query.get();
      }),
      map((snapshot) => (snapshot as QuerySnapshot<IUser>).docs)
    );
  }
}
