// scripts/replace-env.js
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const envPath = path.resolve(__dirname, "../src/environments");

const envContent = `export const environment = {
  production: false,
  currencyApiKey: '${process.env.NG_APP_CURRENCY_API_KEY}',
  currencyApiKey2: '${process.env.NG_APP_CURRENCY_API_KEY2}',
};
`;

const prodEnvContent = `export const environment = {
  production: true,
  currencyApiKey: '${process.env.NG_APP_CURRENCY_API_KEY}',
  currencyApiKey2: '${process.env.NG_APP_CURRENCY_API_KEY2}',
};
`;

fs.writeFileSync(path.join(envPath, "environment.ts"), envContent);
fs.writeFileSync(path.join(envPath, "environment.prod.ts"), prodEnvContent);

console.log(
  "✔ Arquivos environment.ts e environment.prod.ts gerados com sucesso."
);
