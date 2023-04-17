import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  columnDefs: ColDef[] = [
    { field: 'user', resizable: true  },
    { field: 'hero', resizable: true  },
    { field: 'enemy', resizable: true },
    { field: 'result', resizable: true  }
];

rowData = [
    { user: 'Uladzimir', hero: 'Tor', enemy: 'Batman', result: 'Win' },
    { user: 'Uladzimir', hero: 'Iron Man', enemy: 'Superman', result: 'Loose' },
    { user: 'Uladzimir', hero: 'Capitan America', enemy: 'Flash', result: 'Win' }
];

}
