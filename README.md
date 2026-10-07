💱 RateFlow API

«A developer-first Currency Exchange API for applications that need currency conversion, exchange rates, and international pricing.»

RateFlow is a RESTful currency API designed for developers, businesses, e-commerce platforms, POS systems, accounting applications, travel apps, marketplaces, and other software that needs currency-related functionality.

The project is designed to evolve from a simple currency converter into a commercial API-as-a-Service (API SaaS) platform.

---

🚀 Features

Current Features

- 💱 Currency conversion
- 📊 Exchange-rate lookup
- 🔑 API-key authentication
- 📚 Swagger/OpenAPI documentation
- ❤️ Health-check endpoint
- ⚡ Lightweight REST API
- 📦 JSON responses
- 🛡️ Basic request validation
- 🧩 Modular architecture

Planned Features

- 🌎 Live exchange rates
- 📈 Historical exchange rates
- 🔄 Multi-currency conversion
- 📦 Batch conversion
- 💰 Merchant fee and markup calculation
- 🔔 Exchange-rate alerts
- 🪝 Webhooks
- 📊 Developer analytics
- 🔐 Persistent API keys
- 🚦 API rate limiting
- 💾 PostgreSQL database
- ⚡ Redis caching
- 👨‍💻 Developer dashboard
- 💳 Subscription plans
- 💵 Payment integration
- 🏢 Business accounts
- 📈 Rate intelligence
- 🛒 E-commerce price conversion

---

🏗️ Architecture

RateFlow is designed using a simple REST API architecture.

                    ┌────────────────────┐
                    │   Client App       │
                    │ Web / Mobile / SaaS│
                    └─────────┬──────────┘
                              │
                              │ HTTPS
                              ▼
                    ┌────────────────────┐
                    │   RateFlow API     │
                    │   Node.js/Express  │
                    └─────────┬──────────┘
                              │
              ┌───────────────┼────────────────┐
              │               │                │
              ▼               ▼                ▼
        Authentication    Conversion       Rate Service
          API Keys          Engine          / Provider
              │               │                │
              └───────────────┼────────────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ PostgreSQL / Redis │
                    └────────────────────┘

---

🛠️ Technology Stack

RateFlow currently uses:

Technology| Purpose
Node.js| Runtime
Express.js| REST API framework
JavaScript| Backend language
Swagger UI| API documentation
PostgreSQL| Planned database
Redis| Planned caching
Docker| Planned containerization

---

📦 Requirements

Before running RateFlow, install:

- Node.js 18 or newer
- npm
- Git

Check your installation:

node --version
npm --version
git --version

---

📥 Installation

Clone the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Open the project:

cd rateflow-mini

Install dependencies:

npm install

---

▶️ Running the API

Start the development server:

npm start

The API will run at:

http://localhost:3000

Swagger documentation:

http://localhost:3000/docs

---

🔑 API Authentication

RateFlow uses an API key to authenticate requests.

Add the API key to your request header:

x-api-key: YOUR_API_KEY

Example:

curl "http://localhost:3000/v1/convert?from=USD&to=PHP&amount=100" \
  -H "x-api-key: YOUR_API_KEY"

Requests without a valid API key will return:

{
  "success": false,
  "error": "Invalid API key"
}

---

💱 Currency Conversion

Convert an amount from one currency to another.

Endpoint

GET /v1/convert

Parameters

Parameter| Required| Description| Example
"from"| Yes| Source currency| "USD"
"to"| Yes| Target currency| "PHP"
"amount"| Yes| Amount to convert| "100"

---

Example Request

curl "http://localhost:3000/v1/convert?from=USD&to=PHP&amount=100" \
  -H "x-api-key: YOUR_API_KEY"

---

Example Response

{
  "success": true,
  "data": {
    "from": "USD",
    "to": "PHP",
    "amount": 100,
    "rate": 58,
    "converted": 5800,
    "timestamp": "2026-10-07T00:00:00.000Z"
  }
}

---

📊 Exchange Rates

Retrieve exchange rates using a base currency.

Endpoint

GET /v1/rates

Example

curl "http://localhost:3000/v1/rates?base=USD" \
  -H "x-api-key: YOUR_API_KEY"

Response:

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

Check whether the API is running.

Endpoint

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

📚 Swagger Documentation

RateFlow includes interactive Swagger documentation.

After starting the server, open:

http://localhost:3000/docs

Swagger allows developers to:

- View API endpoints
- View parameters
- Test requests
- View responses
- Understand authentication
- Explore the API without writing code

---

🌎 Supported Currencies

The current MVP supports:

Code| Currency| Symbol
USD| US Dollar| $
PHP| Philippine Peso| ₱
EUR| Euro| €
JPY| Japanese Yen| ¥
SGD| Singapore Dollar| S$
GBP| British Pound| £

More currencies will be added as the project develops.

---

🧪 Example Use Cases

E-Commerce

An online store can automatically display product prices in different currencies.

Product price:
$100 USD

Customer currency:
PHP

Displayed price:
₱5,800

---

Travel Applications

A travel application can convert hotel, flight, and transportation prices.

Hotel:
$120 USD

Converted:
₱6,960

---

POS Systems

A POS system can calculate prices for customers paying in another supported currency.

---

Accounting Software

Businesses can use RateFlow to convert international transactions into their preferred reporting currency.

---

Mobile Applications

Mobile developers can integrate RateFlow into:

- Shopping apps
- Travel apps
- Finance dashboards
- Expense trackers
- Marketplace apps

---

🔐 Security

Security is an important part of the RateFlow architecture.

The production version should implement:

- API-key authentication
- HTTPS
- Secure secret storage
- Request validation
- Rate limiting
- CORS configuration
- Security headers
- API-key hashing
- API-key revocation
- Audit logs
- Abuse detection

Never expose API keys

Do not put your API key directly into frontend code.

❌ Bad:

const API_KEY = "rf_secret_key";

Instead, store secrets using environment variables.

RATEFLOW_API_KEY=your_secret_key

---

⚠️ Exchange Rate Disclaimer

The current version contains demo exchange rates for development purposes.

These rates should not be treated as:

- Official financial rates
- Banking rates
- Investment information
- Payment settlement rates
- Guaranteed market rates

Before deploying RateFlow commercially, connect the application to a legitimate and appropriately licensed/contracted exchange-rate data provider.

---

📈 Future Live Rate Architecture

The exchange-rate system is designed so the data provider can be replaced without changing the public API.

RateFlow API
     │
     ▼
Rate Service
     │
     ├── Provider A
     │
     ├── Provider B
     │
     └── Cached Data

This makes it possible to change providers later without rebuilding the entire application.

---

⚡ Caching

A future version will use Redis to cache frequently requested rates.

Example:

Client
  │
  ▼
RateFlow
  │
  ▼
Redis Cache
  │
  ├── Cache Hit → Return rate
  │
  └── Cache Miss
          │
          ▼
    Exchange Provider

This will reduce:

- API provider requests
- Response time
- Infrastructure costs

---

📊 Usage Tracking

The commercial version will track:

- Total requests
- Successful requests
- Failed requests
- Requests per endpoint
- API-key usage
- Monthly usage
- Response time
- Error rate
- Rate-limit usage

Example:

{
  "requests": 12450,
  "successful": 12380,
  "failed": 70,
  "averageResponseTime": "82ms"
}

---

🚦 Rate Limiting

Different plans will have different request limits.

Free

1,000 requests/month

Starter

50,000 requests/month

Pro

500,000 requests/month

Business

Custom limit

The actual limits may change as the service develops.

---

💰 Monetization

RateFlow is designed to become an API SaaS product.

Possible pricing structure:

🆓 Free

- 1,000 requests/month
- Basic currency conversion
- Basic API access
- Community support

🚀 Starter

- 50,000 requests/month
- Historical rates
- Batch conversion
- Higher rate limits
- Email support

💎 Pro

- 500,000 requests/month
- Advanced analytics
- Webhooks
- Rate alerts
- Priority support

🏢 Business

- Custom request limits
- Custom integrations
- Dedicated support
- SLA
- Custom features

Pricing can be changed based on infrastructure and provider costs.

---

🧠 Unique Features Planned

RateFlow will eventually include features beyond a basic currency converter.

📈 Rate Intelligence

Analyze historical exchange-rate behavior.

Example:

{
  "currentRate": 58.20,
  "change7d": "+1.4%",
  "change30d": "-0.8%",
  "high52w": 61.20,
  "low52w": 54.10,
  "trend": "rising"
}

This is intended as data analysis, not financial advice.

---

💰 Merchant Pricing

Businesses will be able to calculate prices with a custom markup.

Example:

Product:
$100 USD

Exchange rate:
₱58

Base price:
₱5,800

Merchant markup:
3%

Customer price:
₱5,974

The API can return a detailed fee breakdown.

---

📦 Batch Conversion

Businesses will eventually be able to convert multiple prices in one request.

Example:

{
  "base": "USD",
  "target": "PHP",
  "prices": [
    {
      "sku": "PHONE001",
      "price": 299
    },
    {
      "sku": "LAPTOP001",
      "price": 899
    }
  ]
}

Possible response:

{
  "success": true,
  "data": {
    "currency": "PHP",
    "prices": [
      {
        "sku": "PHONE001",
        "original": 299,
        "converted": 17342
      },
      {
        "sku": "LAPTOP001",
        "original": 899,
        "converted": 52142
      }
    ]
  }
}

---

🔔 Exchange Rate Alerts

Developers will eventually be able to create alerts.

Example:

{
  "base": "USD",
  "target": "PHP",
  "condition": "above",
  "targetRate": 60
}

When the configured condition is reached, RateFlow can send a webhook or notification.

---

🪝 Webhooks

Future webhook events may include:

rate.threshold.reached
rate.updated
usage.limit.warning
usage.limit.reached
api_key.expiring

Example webhook:

{
  "event": "rate.threshold.reached",
  "currencyPair": "USD/PHP",
  "rate": 60.12,
  "timestamp": "2026-10-07T00:00:00Z"
}

---

👨‍💻 Developer Dashboard

A future dashboard will allow developers to:

- Create API keys
- Delete API keys
- View API usage
- Monitor requests
- View errors
- Manage subscriptions
- Configure webhooks
- Configure alerts
- View documentation
- Monitor rate limits

Example:

-------------------------------------
          RateFlow Dashboard
-------------------------------------

API Requests       12,450
Remaining          37,550
Success Rate       99.4%
Average Latency    82ms

Most Used Endpoint
/v1/convert

Top Currency Pair
USD → PHP
-------------------------------------

---

🗄️ Planned Database

The production version will use PostgreSQL.

Planned tables:

users
api_keys
plans
subscriptions
usage_records
exchange_rates
historical_rates
alerts
webhooks
audit_logs

---

🧩 Project Structure

Current MVP:

rateflow-mini/
│
├── src/
│   └── server.js
│
├── package.json
├── README.md
└── .gitignore

Future architecture:

rateflow/
│
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── providers/
│   ├── database/
│   ├── utils/
│   ├── config/
│   └── server.ts
│
├── tests/
│
├── docs/
│
├── docker/
│
├── package.json
├── docker-compose.yml
├── Dockerfile
├── .env.example
└── README.md

---

🛣️ Roadmap

Version 1.0 — MVP

- [x] Currency conversion
- [x] Exchange-rate endpoint
- [x] API-key authentication
- [x] Swagger documentation
- [x] Health endpoint

Version 1.1

- [ ] Live exchange-rate provider
- [ ] More currencies
- [ ] Better API authentication
- [ ] PostgreSQL
- [ ] Persistent API keys
- [ ] Request logging

Version 1.2

- [ ] Redis caching
- [ ] Historical rates
- [ ] Multi-currency conversion
- [ ] Batch conversion
- [ ] Currency formatting

Version 2.0

- [ ] Developer accounts
- [ ] Developer dashboard
- [ ] API usage analytics
- [ ] Rate limiting
- [ ] API-key management
- [ ] Webhooks
- [ ] Exchange-rate alerts

Version 3.0

- [ ] Subscription system
- [ ] Free plan
- [ ] Starter plan
- [ ] Pro plan
- [ ] Business plan
- [ ] Payment integration
- [ ] Automated billing
- [ ] Commercial API access

---

🧪 Testing

Future versions will include automated tests for:

- Currency conversion
- Invalid currencies
- Invalid amounts
- Authentication
- API keys
- Rate limits
- Database operations
- Exchange-rate providers
- Cache behavior
- Webhooks
- Error handling

Run tests with:

npm test

---

🐳 Docker

Docker support is planned for production deployment.

Example:

docker compose up --build

The production architecture will contain:

                 Internet
                    │
                    ▼
              RateFlow API
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       Redis              PostgreSQL
          │
          ▼
    Rate Provider

---

🚀 Deployment

RateFlow can eventually be deployed using platforms such as:

- VPS
- Cloud servers
- Container platforms
- Managed PostgreSQL
- Managed Redis

Before production deployment:

1. Connect a legitimate live FX provider.
2. Configure HTTPS.
3. Configure environment variables.
4. Enable production database.
5. Enable Redis.
6. Remove development API-key endpoints.
7. Configure rate limits.
8. Configure monitoring.
9. Configure backups.
10. Review provider and financial-data licensing requirements.

---

🤝 Contributing

Contributions are welcome.

Fork the repository:

git clone YOUR_GITHUB_REPOSITORY_URL

Create a branch:

git checkout -b feature/my-feature

Make your changes.

Commit:

git commit -m "Add my feature"

Push:

git push origin feature/my-feature

Then open a Pull Request.

---

🐛 Reporting Bugs

If you find a bug, please provide:

- Description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Node.js version
- Operating system
- API response/error

---

💡 Feature Requests

Feature requests are welcome.

Some planned ideas include:

- More currencies
- Cryptocurrency support
- More exchange-rate providers
- Advanced analytics
- More webhook events
- Enterprise features
- SDKs
- Mobile SDK
- Official client libraries

---

📄 License

Choose an appropriate license before publishing RateFlow publicly.

For a commercial API, review the license and third-party data-provider terms carefully before using the project commercially.

---

⚖️ Disclaimer

RateFlow is a software project and does not itself provide banking, investment, payment-processing, or financial-advisory services.

Exchange-rate data may come from third-party providers in future versions. Users and operators are responsible for complying with the applicable provider terms, licenses, laws, and regulations.

---

👨‍💻 Author

RateFlow API

A developer-focused currency API built for modern applications.

---

⭐ Project Status

Status: 🟡 Active Development
Version: 1.0.0 MVP

RateFlow is currently an MVP and is being developed toward a production-ready Currency API-as-a-Service platform.

---

📌 Quick Start

The fastest way to test RateFlow:

npm install
npm start

Then open:

http://localhost:3000/docs

Check the API:

GET /health

Convert currency:

GET /v1/convert?from=USD&to=PHP&amount=100

Get rates:

GET /v1/rates?base=USD

---

⭐ RateFlow

Simple API today. Currency infrastructure tomorrow.
