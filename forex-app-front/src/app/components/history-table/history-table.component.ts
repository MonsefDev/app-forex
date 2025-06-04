import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-history-table',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './history-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryTableComponent {
  displayedColumns: string[] = ['time', 'realRate', 'appliedRate', 'input', 'output'];

  constructor(public currencyService: CurrencyService) {}
}
