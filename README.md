````markdown
# 💱 Currency Exchange Rates App (Angular + API Layer)

Este projeto é um aplicativo Angular que consome a API da [API Layer Exchange Rates](https://apilayer.com/marketplace/exchangerates_data-api) para exibir taxas de câmbio em tempo real. Ele possui fallback automático entre múltiplas chaves de API e está preparado para deploy no Netlify.

## 🚀 Funcionalidades

- Consulta em tempo real das taxas de câmbio.
- Fallback automático entre chaves de API (quando uma atinge o limite).
- Busca de moedas disponíveis.
- Deploy no Netlify.
- Uso de variáveis de ambiente via `.env`.

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/currency-app.git
cd currency-app
npm install
```
````

---

## 🔐 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
NG_APP_CURRENCY_API_KEY=sua_chave_api_1
NG_APP_CURRENCY_API_KEY2=sua_chave_api_2
```

> ⚠️ Use chaves válidas da [API Layer Exchange Rates](https://apilayer.com/marketplace/exchangerates_data-api).

### 2. Gerar arquivos de ambiente

Antes de rodar o app, é necessário gerar os arquivos `environment.ts` e `environment.prod.ts` com base nas variáveis de ambiente:

```bash
node set-env.js
```

Este script irá criar:

```
src/environments/environment.ts
src/environments/environment.prod.ts
```

---

## 🧪 Rodando Localmente

```bash
npm run start
```

O app estará disponível em `http://localhost:4200`.

---

## 🧱 Estrutura do Projeto

```
src/
├── app/
│   ├── core/
│   │      ├── service/
│   │             ├── currency/
│   │                └── currency.service.ts # Serviço com fallback entre chaves
│   ├── pages/
│   ├── shared/
environments/
│   ├── environment.ts              # Gerado via .env
│   └── environment.prod.ts         # Gerado via .env
│   └── environment.example.ts      # Para exemplo
├── set-env.js                      # Script que lê o .env e gera os environments
```

---

## 🌐 Deploy no Netlify

1. Faça o push para um repositório no GitHub.
2. Conecte o repositório no Netlify.
3. No painel da Netlify, configure as variáveis de ambiente:
   - `NG_APP_CURRENCY_API_KEY`
   - `NG_APP_CURRENCY_API_KEY2`
4. Em **Build Command**, use:

```bash
npm install && node set-env.js && npm run build
```

5. Em **Publish directory**, use:

```bash
dist/nome-do-seu-projeto
```

---

## 🔁 Fallback de API Key

O `CurrencyService` tenta usar a `currencyApiKey`. Se ela falhar com erro `429` (limite mensal), ele tenta a `currencyApiKey2` automaticamente.

```ts
if (err.status === 429) {
  // tenta a próxima chave
}
```

---

## 🛡️ Segurança

- As chaves da API não são versionadas no Git (ver `.gitignore`).
- As variáveis de ambiente são injetadas em tempo de build.
- Nunca exponha suas chaves em repositórios públicos.

---

## 📄 Licença

MIT

---

## ✨ Autor

Feito com 💙 por Thiago Pereira  
[LinkedIn](https://www.linkedin.com/in/thiagopds-developer/) | [Portfólio](https://app.netlify.com/sites/portfoliodev-tpds/overview)

```

---
```
