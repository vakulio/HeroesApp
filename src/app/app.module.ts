import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { UserModule } from './user/user.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ArenaComponent } from './arena/arena.component';
import { ScoreComponent } from './score/score.component';
import { HeroesModule } from './heroes/heroes.module';
import { AccountComponent } from './account/account.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatCardModule } from '@angular/material/card';
import { BattlePersonComponent } from './arena/battle-person/battle-person.component';
import { MatTableModule } from '@angular/material/table';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    ArenaComponent,
    ScoreComponent,
    AccountComponent,
    BattlePersonComponent,
    FbTimestampPipe,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    HeroesModule,
    AppRoutingModule,
    UserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CdkAccordionModule,
    MatCardModule,
  ],
  exports: [MatCardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
