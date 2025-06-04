import { Injectable, signal, computed, effect } from '@angular/core';
import { ConversionHistory } from '../models/conversion.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  // Signals principaux
  private _currentRate = signal<number>(1.1);
  private _amount = signal<number>(0);
  private _isUsdMode = signal<boolean>(false);
  private _isFixedRateEnabled = signal<boolean>(false);
  private _fixedRate = signal<number>(1.1);
  private _showRateWarning = signal<boolean>(false);
  private _conversionHistory = signal<ConversionHistory[]>([]);

  // Getters publics (lecture seule)
  readonly currentRate = this._currentRate.asReadonly();
  readonly amount = this._amount.asReadonly();
  readonly isUsdMode = this._isUsdMode.asReadonly();
  readonly isFixedRateEnabled = this._isFixedRateEnabled.asReadonly();
  readonly fixedRate = this._fixedRate.asReadonly();
  readonly showRateWarning = this._showRateWarning.asReadonly();
  readonly conversionHistory = this._conversionHistory.asReadonly();

  // Computed signals
  readonly effectiveRate = computed(() =>
    this._isFixedRateEnabled() ? this._fixedRate() : this._currentRate()
  );

  readonly convertedAmount = computed(() => {
    const amount = this._amount();
    if (amount <= 0) return 0;
    const rate = this.effectiveRate();
    return this._isUsdMode() ? amount / rate : amount * rate;
  });

  readonly rateVariation = computed(() =>
    ((this._currentRate() - 1.1) / 1.1) * 100
  );

  readonly isRateIncreasing = computed(() => this.rateVariation() > 0);
  readonly fromCurrency = computed(() => this._isUsdMode() ? 'USD' : 'EUR');
  readonly toCurrency = computed(() => this._isUsdMode() ? 'EUR' : 'USD');

  private rateUpdateInterval?: number;

  constructor() {
    this.startRateUpdates();
    this.setupConversionTracking();
  }

  // Actions publiques
  updateAmount(newAmount: number): void {
    this._amount.set(Math.max(0, newAmount));
  }

  toggleCurrency(): void {
    if (this.convertedAmount() > 0) {
      this._amount.set(this.convertedAmount());
    }
    this._isUsdMode.update(mode => !mode);
  }

  toggleFixedRate(): void {
    const newState = !this._isFixedRateEnabled();
    this._isFixedRateEnabled.set(newState);
    if (newState) {
      this._fixedRate.set(this._currentRate());
      this._showRateWarning.set(false);
    }
  }

  updateFixedRate(newRate: number): void {
    this._fixedRate.set(Math.max(0.1, Math.min(10, newRate)));
  }

  private startRateUpdates(): void {
    this.rateUpdateInterval = window.setInterval(() => {
      const variation = (Math.random() - 0.5) * 0.04; // ±0.02 pour plus de stabilité
      const newRate = Math.max(0.1, this._currentRate() + variation);
      this._currentRate.set(newRate);
      this.checkFixedRateWarning(newRate);
    }, 4000);
  }

  private checkFixedRateWarning(newRate: number): void {
    if (this._isFixedRateEnabled()) {
      const fixedRate = this._fixedRate();
      const percentageDiff = Math.abs((newRate - fixedRate) / newRate) * 100;

      if (percentageDiff > 5) {
        setTimeout(() => {
          this._isFixedRateEnabled.set(false);
          this._showRateWarning.set(true);
          setTimeout(() => this._showRateWarning.set(false), 6000);
        }, 0);
      }
    }
  }

  private setupConversionTracking(): void {
    effect(() => {
      const amount = this._amount();
      const convertedAmount = this.convertedAmount();
      if (amount > 0 && convertedAmount > 0) {
        this.addToHistory();
      }
    }, { allowSignalWrites: true });
  }

  private addToHistory(): void {
    const newEntry: ConversionHistory = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
      realRate: this._currentRate(),
      appliedRate: this.effectiveRate(),
      inputValue: this._amount(),
      inputCurrency: this.fromCurrency(),
      outputValue: this.convertedAmount(),
      outputCurrency: this.toCurrency(),
      timestamp: new Date()
    };

    this._conversionHistory.update(history =>
      [newEntry, ...history].slice(0, 5)
    );
  }

  destroy(): void {
    if (this.rateUpdateInterval) {
      clearInterval(this.rateUpdateInterval);
    }
  }
}