// currency.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, SymbolsResponse } from '../../shared/types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'https://api.apilayer.com/exchangerates_data';

  private apiKeys = [environment.currencyApiKey, environment.currencyApiKey2];

  constructor(private http: HttpClient) {}

  private getHeaders(apiKey: string): HttpHeaders {
    return new HttpHeaders({ apikey: apiKey });
  }

  private tryRequestWithFallback<T>(
    requestFn: (apiKey: string) => Observable<T>
  ): Observable<T> {
    return new Observable<T>((subscriber) => {
      let index = 0;

      const tryNext = () => {
        if (index >= this.apiKeys.length) {
          subscriber.error('Todas as API keys falharam.');
          return;
        }

        const key = this.apiKeys[index++];
        requestFn(key!).subscribe({
          next: (value) => {
            subscriber.next(value);
            subscriber.complete();
          },
          error: (err) => {
            if (err?.status === 429 || err?.error?.message?.includes('quota')) {
              console.warn(`Chave falhou por limite, tentando próxima...`);
              tryNext();
            } else {
              console.error('Erro não relacionado a limite:', err);
              subscriber.error(err);
            }
          },
        });
      };

      tryNext();
    });
  }

  getExchangeRates(base: string, symbols: string[]): Observable<ApiResponse> {
    const symbolsParam = symbols.join(',');
    const url = `${this.baseUrl}/latest?base=${base}&symbols=${symbolsParam}`;

    return this.tryRequestWithFallback((apiKey) => {
      const headers = this.getHeaders(apiKey);
      return this.http.get<ApiResponse>(url, { headers });
    });
  }

  getAllSymbols(): Observable<SymbolsResponse> {
    const url = `${this.baseUrl}/symbols`;

    return this.tryRequestWithFallback((apiKey) => {
      const headers = this.getHeaders(apiKey);
      return this.http.get<SymbolsResponse>(url, { headers });
    });
  }
}
