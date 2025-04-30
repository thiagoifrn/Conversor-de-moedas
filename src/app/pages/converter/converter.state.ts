import { Inject, Injectable, signal } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { Currency } from '../../shared/types';
import { CURRENCY_CACHE_DURATION } from '../../../cache.config';

@Injectable({ providedIn: 'root' })
export class ConverterState {
  private readonly currenciesSignal = signal<Currency[]>([
    { code: 'BRL', description: 'Brazilian Real' },
    { code: 'USD', description: 'United States Dollar' },
    { code: 'EUR', description: 'Euro' },
  ]);

  private readonly lastFetchTime = signal<number | null>(null);

  amount = signal(1000);
  fromCurrency = signal('BRL');
  toCurrency = signal('USD');
  isLoading = signal(false);
  result = signal(0);

  constructor(
    private currencyService: CurrencyService,
    @Inject(CURRENCY_CACHE_DURATION) private cacheDuration: number
  ) {}

  loadCurrencies() {
    const now = Date.now();

    if (this.cacheStillValid()) {
      return;
    }

    this.currencyService.getAllSymbols().subscribe((response) => {
      const data = response.symbols;
      const currencies = Object.keys(data).map((code) => ({
        code,
        description: data[code],
      }));
      this.currenciesSignal.set(currencies);
      this.lastFetchTime.set(now);
    });
  }

  currencies() {
    return this.currenciesSignal();
  }

  private cacheStillValid(): boolean {
    const now = Date.now();

    return (
      this.currenciesSignal().length > 0 &&
      this.lastFetchTime() !== null &&
      now - this.lastFetchTime()! < this.cacheDuration
    );
  }

  convertCurrency() {
    const base = this.fromCurrency();
    const symbols = [this.toCurrency()];

    this.isLoading.set(true);

    this.currencyService.getExchangeRates(base, symbols).subscribe({
      next: (response) => {
        const rate = response.rates[this.toCurrency()];
        const converted = this.amount() * rate;
        this.result.set(converted);
        this.isLoading.set(false);
      },
      error: () => {
        this.result.set(0);
        this.isLoading.set(false);
      },
    });
  }

  invertCurrencies() {
    const temp = this.fromCurrency();
    this.fromCurrency.set(this.toCurrency());
    this.toCurrency.set(temp);
    this.convertCurrency();
  }
}
