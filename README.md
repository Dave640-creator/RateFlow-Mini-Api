💱 RateFlow API

A simple and developer-friendly Currency Exchange API built with Node.js and Express.

RateFlow allows developers to convert currencies and retrieve exchange rates through a simple REST API.

«⚠️ Development Version: This project currently uses demo exchange rates. Connect a licensed/live exchange-rate provider before using it for real financial applications or selling live-rate access.»

---

🚀 Features

- 💱 Currency conversion
- 📊 Exchange-rate lookup
- 🔑 API-key authentication
- 📚 Swagger API documentation
- ❤️ Health-check endpoint
- ⚡ Lightweight REST API
- 🧩 Easy to extend
- 🛠️ Developer-friendly JSON responses

---

📦 Requirements

Before running RateFlow, make sure you have:

- Node.js 18+
- npm

Check your versions:

node --version
npm --version

---

⚙️ Installation

Clone the project:

git clone YOUR_GITHUB_REPOSITORY_URL

Enter the project folder:

cd rateflow-mini

Install dependencies:

npm install

---

▶️ Running the API

Start the server:

npm start

You should see something similar to:

RateFlow API: http://localhost:3000
Swagger: http://localhost:3000/docs

Your API key: rf_xxxxxxxxxxxxxxxxxxxxxxxx

Save the API key because it is required when making API requests.

---

🔑 API Authentication

RateFlow uses an API key for authentication.

Add your API key to the request header:

x-api-key: YOUR_API_KEY

Example:

curl "http://localhost:3000/v1/convert?from=USD&to=PHP&amount=100" \
  -H "x-api-key: YOUR_API_KEY"

---

💱 Currency Conversion

Endpoint

GET /v1/convert

Parameters

Parameter| Required| Example
"from"| Yes| "USD"
"to"| Yes| "PHP"
"amount"| Yes| "100"

Example

curl "http://localhost:3000/v1/convert?from=USD&to=PHP&amount=100" \
  -H "x-api-key: YOUR_API_KEY"

Response

{
  "success": true,
  "data": {
    "from": "USD",
    "to": "PHP",
    "amount": 100,
    "rate": 58,
    "converted": 5800,
    "timestamp": "2026-10-06T00:00:00.000Z"
  }
}

---

📊 Exchange Rates

Endpoint

GET /v1/rates

Example

curl "http://localhost:3000/v1/rates?base=USD" \
  -H "x-api-key: YOUR_API_KEY"

Response

{
  "success": true,
  "data": {
    "base": "USD",
    "rates": {
      "PHP": 58,
      "EUR": 0.86,
      "JPY": 156,
      "SGD": 1.28,
      "GBP": 0.75
    }
  }
}

---

❤️ Health Check

You can check whether the API is running:

GET /health

Example:

curl http://localhost:3000/health

Response:

{
  "status": "ok",
  "service": "RateFlow API",
  "version": "1.0.0"
}

---

📚 API Documentation

RateFlow includes Swagger documentation.

After starting the server, open:

http://localhost:3000/docs

From Swagger, you can explore and test the available endpoints.

---

🧪 Supported Currencies

The current development version supports:

Code| Currency
USD| US Dollar
PHP| Philippine Peso
EUR| Euro
JPY| Japanese Yen
SGD| Singapore Dollar
GBP| British Pound

More currencies can be added easily.

---

🏗️ Project Structure

rateflow-mini/
│
├── src/
│   └── server.js
│
├── package.json
├── README.md
└── .gitignore

---

🔒 Security

The API uses an API key to prevent unauthorized requests.

For production:

- Never expose your API key publicly.
- Store secrets in environment variables.
- Use HTTPS.
- Add request rate limiting.
- Store API keys securely.
- Add API-key revocation.
- Add usage monitoring.
- Validate all incoming requests.

---

⚠️ Current Limitations

This is an MVP/development version.

Currently:

- Exchange rates are demo rates.
- API keys are generated when the server starts.
- No database is included yet.
- No user accounts.
- No subscription system.
- No payment integration.
- No historical exchange-rate database.
- No live exchange-rate provider.
- No Redis caching yet.

These features are planned for future versions.

---

🛣️ Roadmap

Version 1.1

- [ ] Live exchange-rate provider
- [ ] More currencies
- [ ] PostgreSQL database
- [ ] Persistent API keys
- [ ] API-key management
- [ ] Request logging

Version 1.2

- [ ] Redis caching
- [ ] Historical exchange rates
- [ ] Batch currency conversion
- [ ] Currency formatting
- [ ] Better error handling

Version 2.0

- [ ] Developer dashboard
- [ ] User accounts
- [ ] API usage analytics
- [ ] Monthly request limits
- [ ] API key management
- [ ] Webhooks
- [ ] Exchange-rate alerts

Version 3.0

- [ ] Free plan
- [ ] Starter plan
- [ ] Pro plan
- [ ] Business plan
- [ ] Subscription billing
- [ ] Automated usage limits
- [ ] Commercial API access

---

💰 Future Business Model

RateFlow is designed to eventually become a SaaS API service.

Possible plans:

Free

1,000 requests/month
Basic currencies
Community support

Starter

50,000 requests/month
Historical rates
Batch conversion
Email support

Pro

500,000 requests/month
Advanced analytics
Webhooks
Rate alerts
Priority support

Business

Custom request limits
Dedicated support
Custom features
SLA

---

🎯 Target Users

RateFlow can be useful for:

- E-commerce websites
- Online stores
- POS systems
- Travel applications
- Accounting software
- Financial dashboards
- Marketplaces
- Mobile applications
- SaaS applications
- International businesses

---

🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

git checkout -b feature/my-feature

3. Make your changes.
4. Commit your changes.

git commit -m "Add new feature"

5. Push the branch.

git push origin feature/my-feature

6. Open a Pull Request.

---

📄 License

Choose a license before publishing the project publicly.

For a commercial API, review the license carefully and make sure it matches your intended business model.

---

👨‍💻 Author

RateFlow API

Built as a developer-focused currency conversion API.

---

⭐ Support the Project

If you find RateFlow useful, consider giving the repository a ⭐ on GitHub.

More features are coming soon.
