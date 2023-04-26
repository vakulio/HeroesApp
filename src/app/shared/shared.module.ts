import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';
import { TabComponent } from './tab/tab.component';
import { AlertComponent } from './alert/alert.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeroElComponent } from './hero-el/hero-el.component';


@NgModule({
  declarations: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    AlertComponent,
    InputComponent,
    HeroElComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent,
    TabsContainerComponent,
    TabComponent,
    InputComponent,
    AlertComponent
  ],
})
export class SharedModule { }
