import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IPowerup, IUserPowerups } from '../models/powerup.models';
import { PowersService } from '../services/powers.service';
import { ModalService } from '../services/modal.service';
import { POWERUPS } from '../constants/powerups';

@Component({
  selector: 'app-power-ups',
  templateUrl: './power-ups.component.html',
  styleUrls: ['./power-ups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PowerUpsComponent implements OnInit, OnDestroy {
  powerupsData: IPowerup[] = POWERUPS;
  userPower: IUserPowerups = {} as IUserPowerups;

  constructor(
    private powerups: PowersService,
    private cd: ChangeDetectorRef,
    public modal: ModalService
  ) {
    powerups.getPowerupsData().subscribe((docs) => {
      const powerData = docs.map((doc) => {
        return {
          ...doc.data(),
        };
      });
      this.userPower = powerData[0];
      this.cd.detectChanges();
    });
  }

  ngOnInit(): void {
    this.modal.register('money');
  }

  ngOnDestroy(): void {
    this.modal.unregister('money');
  }

  buyPowerup(item: IPowerup) {
    if (item.price > this.userPower.money) {
      this.modal.toggleModal('money');
      return;
    }
    this.userPower.money -= item.price;
    this.userPower.powerUps[item.id] += 1;
    console.log(this.userPower);
    this.powerups.saveUserPowers(this.userPower);
    this.cd.detectChanges();
  }
}
