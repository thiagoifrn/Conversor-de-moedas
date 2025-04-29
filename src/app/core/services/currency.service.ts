// currency.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment';
import { ApiResponse, Currency, SymbolsResponse } from '../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'https://api.apilayer.com/exchangerates_data';
  private apiKey = environment.currencyApiKey2;

  constructor(private http: HttpClient) {}

  getExchangeRates(base: string, symbols: string[]): Observable<ApiResponse> {
    const headers = new HttpHeaders({
      apikey: this.apiKey,
    });
    const symbolsParam = symbols.join(',');
    const url = `${this.baseUrl}/latest?base=${base}&symbols=${symbolsParam}`;
    return this.http.get<ApiResponse>(url, { headers });
  }

  getAllSymbols(): Observable<SymbolsResponse> {
    const headers = new HttpHeaders({
      apikey: this.apiKey,
    });
    return this.http.get<SymbolsResponse>(`${this.baseUrl}/symbols`, {
      headers,
    });
  }
}
