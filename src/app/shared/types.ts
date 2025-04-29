export type ApiResponse = {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: {
    [key: string]: number; // para lidar com várias taxas de câmbio
  };
};

export type SymbolsResponse = {
  success: boolean;
  symbols: {
    [currencyCode: string]: string; // Ex: "AED": "United Arab Emirates Dirham"
  };
};

export type Currency = {
  code: string;
  description: string;
};
