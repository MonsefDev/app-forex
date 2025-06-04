export interface ConversionHistory {
  id: string;
  realRate: number;
  appliedRate: number;
  inputValue: number;
  inputCurrency: 'EUR' | 'USD';
  outputValue: number;
  outputCurrency: 'EUR' | 'USD';
  timestamp: Date;
}