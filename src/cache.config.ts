import { InjectionToken } from '@angular/core';

export const CURRENCY_CACHE_DURATION = new InjectionToken<number>(
  'CURRENCY_CACHE_DURATION',
  {
    providedIn: 'root', // Pode ser 'root' ou um módulo específico
    factory: () => 3600, // Valor padrão (em segundos, por exemplo)
  }
);
