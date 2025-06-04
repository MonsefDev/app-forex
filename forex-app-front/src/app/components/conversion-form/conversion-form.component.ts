import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-conversion-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatDividerModule,
    MatChipsModule
  ],
  templateUrl:'./conversion-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversionFormComponent {
  constructor(public currencyService: CurrencyService) {}

  onAmountChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 0;
    this.currencyService.updateAmount(value);
  }

  onFixedRateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value) || 1.1;
    this.currencyService.updateFixedRate(value);
  }
}