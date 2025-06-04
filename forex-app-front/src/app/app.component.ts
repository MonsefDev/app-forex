import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyService } from './services/currency.service';
import { RateDisplayComponent } from './components/rate-display/rate-display.component';
import { ConversionFormComponent } from './components/conversion-form/conversion-form.component';
import { HistoryTableComponent } from './components/history-table/history-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RateDisplayComponent,
    ConversionFormComponent,
    HistoryTableComponent
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  title = 'forex-app-front';

  constructor(private currencyService: CurrencyService) {}

  ngOnDestroy(): void {
    this.currencyService.destroy();
  }
}