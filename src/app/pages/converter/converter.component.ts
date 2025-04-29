import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../core/services/currency.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  currencies = [
    { code: 'USD' },
    { code: 'EUR' },
    { code: 'BRL' },
    { code: 'GBP' },
    { code: 'CHF' },
  ];

  amount: number = 1000;
  fromCurrency: string = 'BRL';
  toCurrency: string = 'USD';
  result: number = 0;

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.convertCurrency();
  }

  getFlagEmoji(code: string): string {
    return String.fromCodePoint(
      ...[...code.slice(0, 2).toUpperCase()].map(
        (c) => 127397 + c.charCodeAt(0)
      )
    );
  }

  convertCurrency() {
    this.currencyService
      .getExchangeRates(this.fromCurrency, [this.toCurrency])
      .subscribe((data) => {
        const key = this.fromCurrency + this.toCurrency;
        const rate = data.quotes?.[key];

        if (rate) {
          this.result = this.amount * rate;
        } else {
          this.result = 0; // fallback caso não encontre a taxa
        }
      });
  }

  onValueChange() {
    this.convertCurrency();
  }

  invertCurrencies() {
    [this.fromCurrency, this.toCurrency] = [this.toCurrency, this.fromCurrency];
    this.convertCurrency();
  }
}
