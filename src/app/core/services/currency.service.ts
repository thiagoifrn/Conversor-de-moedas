import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = 'https://api.exchangerate.host';

  constructor(private http: HttpClient) {}

  getExchangeRates(base: string, symbols: string[]): Observable<any> {
    const symbolsParam = symbols.join(',');
    const url = `${this.baseUrl}/latest?base=${base}&symbols=${symbolsParam}`;
    return this.http.get<any>(url);
  }

  getAllSymbols(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/symbols`);
  }
}
