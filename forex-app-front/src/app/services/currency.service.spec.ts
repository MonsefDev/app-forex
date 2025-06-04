import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyService);
  });

  afterEach(() => {
    service.destroy();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update amount and calculate converted amount', fakeAsync(() => {
    service.updateAmount(100);
    tick(1000);
    expect(service.amount()).toBe(100);
    const rate = service.effectiveRate();
    const expected = 100 * rate;
    expect(service.convertedAmount()).toBeCloseTo(expected, 2);
  }));

  it('should toggle currency mode and recalculate amount', fakeAsync(() => {
    service.updateAmount(100);
    tick(1000);
    const before = service.convertedAmount();
    service.toggleCurrency();
    tick(1000);
    expect(service.amount()).toBeCloseTo(before, 2);
    expect(service.isUsdMode()).toBeTrue();
  }));

  it('should enable and set fixed rate', fakeAsync(() => {
    service.toggleFixedRate();
    tick(1000);
    expect(service.isFixedRateEnabled()).toBeTrue();
    expect(service.fixedRate()).toBeCloseTo(service.currentRate(), 2);
  }));

  it('should limit the fixed rate between 0.1 and 10', () => {
    service.updateFixedRate(0.05);
    expect(service.fixedRate()).toBe(0.1);
    service.updateFixedRate(20);
    expect(service.fixedRate()).toBe(10);
  });

  it('should stop rate updates on destroy', () => {
    spyOn(window, 'clearInterval').and.callThrough();
    service.destroy();
    expect(clearInterval).toHaveBeenCalled();
  });
});
