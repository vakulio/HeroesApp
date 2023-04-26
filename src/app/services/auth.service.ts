import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore'
import { IUser, IUserDB } from '../models/user.models';
import { Observable, of } from 'rxjs';
import { delay, map, filter, switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollections: AngularFirestoreCollection<IUserDB>
  public isAuth$: Observable<boolean>
  public isAuthWithDelay$: Observable<boolean>
  private redirect = false


  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute)
    {
      this.userCollections = db.collection('users')
      this.isAuth$ = auth.user.pipe(
        map(user => !!user)
      )
      this.isAuthWithDelay$ = this.isAuth$.pipe(
        delay(1000)
      )
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(e => this.route.firstChild),
        switchMap(route => route?.data ?? of()),
      ).subscribe(data => {
        this.redirect = data['authOnly'] ?? false
      }
      )
    }

  public async createUser(userData: IUser) {
    if(!userData.password) {
      throw new Error('Password not provided!')
    }

    const userCreds = await this.auth.createUserWithEmailAndPassword(
      userData.email, userData.password)

    if(!userCreds.user) {
      throw new Error("User can't be found")
    }

    await this.userCollections.doc(userCreds.user?.uid).set({
      name: userData.name,
      email: userData.email,
      money: 100,
      heroes: [],
      battleStory: []
    })

    await userCreds.user.updateProfile({
      displayName: userData.name
    })
  }


  public async logout($event?: Event) {
    if($event) {
      $event.preventDefault()
    }

    await this.afAuth.signOut()
    if(this.redirect){
      await this.router.navigateByUrl('/')
    }

  }
}
