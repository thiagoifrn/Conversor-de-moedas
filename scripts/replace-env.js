const fs = require("fs");
const path = "./src/environments/environment.prod.ts";

const currencyApiKey = process.env.NG_APP_CURRENCY_API_KEY || "";
const currencyApiKey2 = process.env.NG_APP_CURRENCY_API_KEY2 || "";

const content = `
export const environment = {
  production: true,
  currencyApiKey: '${currencyApiKey}',
  currencyApiKey2: '${currencyApiKey2}',
};
`;

fs.writeFileSync(path, content);
console.log(
  "✔ environment.prod.ts gerado com variáveis de ambiente do Netlify."
);
