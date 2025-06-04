import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-rate-display',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatChipsModule],
  templateUrl: './rate-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateDisplayComponent {
  constructor(public currencyService: CurrencyService) {}
}
