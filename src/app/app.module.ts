import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ArenaComponent } from './arena/arena.component';
import { ScoreComponent } from './score/score.component';
import { HeroesModule } from './heroes/heroes.module';
import { AccountComponent } from './account/account.component';
import { AgGridModule } from 'ag-grid-angular';
import {CdkAccordionModule} from '@angular/cdk/accordion'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    ArenaComponent,
    ScoreComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    HeroesModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AgGridModule,
    CdkAccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
