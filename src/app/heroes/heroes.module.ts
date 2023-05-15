import { NgModule } from '@angular/core';
import { CommonModule, PercentPipe } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { CurrentHeroComponent } from './current-hero/current-hero.component';
import { AllHeroesComponent } from './all-heroes/all-heroes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { HeroComponent } from './hero/hero.component';
import { AddPercentPipe } from './pipes/add-percent.pipe';
import { PowerStatItemComponent } from './shared/power-stat-item/power-stat-item.component';
import {MatSelectModule} from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReplaceUrlPipe } from '../pipes/replace-url.pipe';

@NgModule({
  declarations: [
    AllHeroesComponent,
    CurrentHeroComponent,
    HeroComponent,
    AddPercentPipe,
    PowerStatItemComponent,
    ReplaceUrlPipe,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkAccordionModule,
    MatSelectModule,
    BrowserAnimationsModule,
  ],
  exports: [PercentPipe, ReplaceUrlPipe],
  providers: [PercentPipe],
})
export class HeroesModule {}
