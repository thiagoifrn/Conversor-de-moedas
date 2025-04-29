import { Injectable, signal } from '@angular/core';
import { CurrencyService } from '../../core/services/currency.service';
import { Currency } from '../../shared/types';

@Injectable({ providedIn: 'root' })
export class ConverterState {
  private readonly currenciesSignal = signal<Currency[]>([]);

  amount = signal(1000);
  fromCurrency = signal('BRL');
  toCurrency = signal('USD');
  isLoading = signal(false);
  result = signal(0);

  constructor(private currencyService: CurrencyService) {}

  loadCurrencies() {
    this.currencyService.getAllSymbols().subscribe((response) => {
      const data = response.symbols;
      const currencies = Object.keys(data).map((code) => ({
        code,
        description: data[code],
      }));
      this.currenciesSignal.set(currencies);
    });
  }

  currencies() {
    return this.currenciesSignal();
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
