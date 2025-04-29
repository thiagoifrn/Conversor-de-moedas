import { Component, OnInit } from '@angular/core';
import { ConverterConsumer } from './converter.consumer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { currencyToFlagMap } from '../../shared/currency-to-flag';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, NgSelectModule],
  providers: [ConverterConsumer],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent implements OnInit {
  constructor(public consumer: ConverterConsumer) {}

  ngOnInit(): void {
    this.state.loadCurrencies();
  }

  get state() {
    return this.consumer.state;
  }

  getFlagEmoji(currencyCode: string): string {
    const countryCode =
      currencyToFlagMap[currencyCode] || currencyCode.slice(0, 2);
    return countryCode.replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
  }
}
