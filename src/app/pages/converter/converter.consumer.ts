import { Injectable, OnInit, effect } from '@angular/core';
import { ConverterState } from './converter.state';
import { debounceTime, Subject } from 'rxjs';

@Injectable()
export class ConverterConsumer {
  private trigger$ = new Subject<void>();

  constructor(public state: ConverterState) {
    this.setupAutoConvert();
  }

  setupAutoConvert() {
    this.trigger$.pipe(debounceTime(500)).subscribe(() => {
      this.state.convertCurrency();
    });

    effect(() => {
      this.state.amount(); // tracking
      this.trigger$.next();
    });
  }

  onAmountChange(value: number) {
    this.state.amount.set(value);
  }

  onFromCurrencyChange(value: string) {
    this.state.fromCurrency.set(value);
    this.state.convertCurrency();
  }

  onToCurrencyChange(value: string) {
    this.state.toCurrency.set(value);
    this.state.convertCurrency();
  }

  invertCurrencies() {
    this.state.invertCurrencies();
  }
}
