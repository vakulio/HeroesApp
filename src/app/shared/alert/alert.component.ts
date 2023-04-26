import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() color = 'blue'

  get bgColor() {
    return `bg-${this.color}-400`;
  }
}
