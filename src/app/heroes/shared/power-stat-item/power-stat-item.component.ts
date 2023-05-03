import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-power-stat-item',
  templateUrl: './power-stat-item.component.html',
  styleUrls: ['./power-stat-item.component.css']
})
export class PowerStatItemComponent {
  @Input() titleName: string = '';
  @Input() powerStat: string = '';
  @Input() color: string = '';
}
