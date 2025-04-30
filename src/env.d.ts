/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NG_APP_CURRENCY_API_KEY: string;
  readonly NG_APP_CURRENCY_API_KEY2: string;
  // adicione outras variáveis aqui se precisar
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
