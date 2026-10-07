const express = require("express");
const swaggerUi = require("swagger-ui-express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const PORT = 3000;

/*
|--------------------------------------------------------------------------
| API KEY
|--------------------------------------------------------------------------
| For this MVP, the API key is generated when the server starts.
| Later, we can move this to PostgreSQL for persistent API keys.
|--------------------------------------------------------------------------
*/

const API_KEY =
  process.env.RATEFLOW_API_KEY ||
  "rf_" + crypto.randomBytes(16).toString("hex");

console.log("======================================");
console.log("        RATEFLOW API STARTED");
console.log("======================================");
console.log("API Key:", API_KEY);
console.log("API:     http://localhost:" + PORT);
console.log("Docs:    http://localhost:" + PORT + "/docs");
console.log("======================================");


/*
|--------------------------------------------------------------------------
| DEMO EXCHANGE RATES
|--------------------------------------------------------------------------
| Base currency: USD
|
| IMPORTANT:
| These are DEMO rates.
| Replace them with a legitimate live FX provider before production.
|--------------------------------------------------------------------------
*/

const USD_RATES = {
  USD: 1,
  PHP: 58.00,
  EUR: 0.86,
  GBP: 0.75,
  JPY: 156.00,
  SGD: 1.28,
  AUD: 1.52,
  CAD: 1.38,
  CNY: 7.12
};


/*
|--------------------------------------------------------------------------
| SUPPORTED CURRENCIES
|--------------------------------------------------------------------------
*/

const CURRENCIES = {
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$"
  },

  PHP: {
    code: "PHP",
    name: "Philippine Peso",
    symbol: "₱"
  },

  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€"
  },

  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£"
  },

  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥"
  },

  SGD: {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$"
  },

  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$"
  },

  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$"
  },

  CNY: {
    code: "CNY",
    name: "Chinese Yuan",
    symbol: "¥"
  }
};


/*
|--------------------------------------------------------------------------
| SIMPLE USAGE TRACKER
|--------------------------------------------------------------------------
*/

const usage = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0
};


/*
|--------------------------------------------------------------------------
| MIDDLEWARE
|--------------------------------------------------------------------------
*/

function authenticate(req, res, next) {

  // Public endpoints
  if (
    req.path === "/health" ||
    req.path === "/docs" ||
    req.path.startsWith("/docs/")
  ) {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {

    usage.failedRequests++;

    return res.status(401).json({
      success: false,
      error: {
        code: "MISSING_API_KEY",
        message: "x-api-key header is required."
      }
    });
  }

  if (apiKey !== API_KEY) {

    usage.failedRequests++;

    return res.status(401).json({
      success: false,
      error: {
        code: "INVALID_API_KEY",
        message: "The API key is invalid."
      }
    });
  }

  usage.totalRequests++;

  next();
}


app.use(authenticate);


/*
|--------------------------------------------------------------------------
| HELPER FUNCTIONS
|--------------------------------------------------------------------------
*/


function getRate(from, to) {

  from = from.toUpperCase();
  to = to.toUpperCase();

  if (!CURRENCIES[from]) {
    throw new Error(`Unsupported currency: ${from}`);
  }

  if (!CURRENCIES[to]) {
    throw new Error(`Unsupported currency: ${to}`);
  }

  /*
   * Convert:
   *
   * FROM -> USD -> TO
   */

  const fromToUSD = 1 / USD_RATES[from];

  const usdToTarget = USD_RATES[to];

  return fromToUSD * usdToTarget;
}


function round(number, decimals = 2) {

  return Number(
    Number(number).toFixed(decimals)
  );

}


function createResponse(data) {

  return {
    success: true,

    data,

    meta: {
      timestamp: new Date().toISOString(),
      provider: "RateFlow Demo Provider",
      dataStatus: "demo"
    }
  };

}


/*
|--------------------------------------------------------------------------
| HEALTH CHECK
|--------------------------------------------------------------------------
*/

app.get("/health", (req, res) => {

  res.json({
    status: "ok",
    service: "RateFlow API",
    version: "1.0.0",
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });

});


/*
|--------------------------------------------------------------------------
| GET CURRENCIES
|--------------------------------------------------------------------------
|
| GET /v1/currencies
|
|--------------------------------------------------------------------------
*/

app.get("/v1/currencies", (req, res) => {

  const currencies = Object.values(CURRENCIES);

  res.json(
    createResponse({
      count: currencies.length,
      currencies
    })
  );

});


/*
|--------------------------------------------------------------------------
| GET LATEST RATES
|--------------------------------------------------------------------------
|
| GET /v1/rates?base=USD
|
|--------------------------------------------------------------------------
*/

app.get("/v1/rates", (req, res) => {

  try {

    const base =
      String(req.query.base || "USD")
        .toUpperCase();

    if (!CURRENCIES[base]) {

      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_CURRENCY",
          message: `Currency ${base} is not supported.`
        }
      });

    }

    const rates = {};

    for (const currency of Object.keys(CURRENCIES)) {

      rates[currency] =
        round(getRate(base, currency), 6);

    }

    res.json(
      createResponse({
        base,
        rates
      })
    );

  } catch (error) {

    usage.failedRequests++;

    res.status(400).json({
      success: false,
      error: {
        code: "RATE_ERROR",
        message: error.message
      }
    });

  }

});


/*
|--------------------------------------------------------------------------
| CONVERT CURRENCY
|--------------------------------------------------------------------------
|
| GET /v1/convert
|
| Example:
|
| /v1/convert?from=USD&to=PHP&amount=100
|
|--------------------------------------------------------------------------
*/

app.get("/v1/convert", (req, res) => {

  try {

    const from =
      String(req.query.from || "USD")
        .toUpperCase();

    const to =
      String(req.query.to || "PHP")
        .toUpperCase();

    const amount =
      Number(req.query.amount);


    if (!Number.isFinite(amount)) {

      usage.failedRequests++;

      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_AMOUNT",
          message: "Amount must be a valid number."
        }
      });

    }


    if (amount < 0) {

      usage.failedRequests++;

      return res.status(400).json({
        success: false,
        error: {
          code: "NEGATIVE_AMOUNT",
          message: "Amount cannot be negative."
        }
      });

    }


    const rate = getRate(from, to);

    const converted = amount * rate;


    res.json(
      createResponse({

        from,

        to,

        originalAmount: amount,

        exchangeRate: round(rate, 8),

        convertedAmount: round(converted, 2),

        sourceCurrency: CURRENCIES[from],

        targetCurrency: CURRENCIES[to]

      })
    );

  } catch (error) {

    usage.failedRequests++;

    res.status(400).json({
      success: false,
      error: {
        code: "CONVERSION_ERROR",
        message: error.message
      }
    });

  }

});


/*
|--------------------------------------------------------------------------
| MULTI-CURRENCY CONVERSION
|--------------------------------------------------------------------------
|
| Example:
|
| /v1/convert/multi
| ?from=USD
| &amount=100
| &to=PHP,EUR,JPY
|
|--------------------------------------------------------------------------
*/

app.get("/v1/convert/multi", (req, res) => {

  try {

    const from =
      String(req.query.from || "USD")
        .toUpperCase();

    const amount =
      Number(req.query.amount);


    const targets =
      String(req.query.to || "PHP,EUR,JPY")
        .split(",")
        .map(currency =>
          currency.trim().toUpperCase()
        );


    if (!Number.isFinite(amount)) {

      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_AMOUNT",
          message: "Amount must be a valid number."
        }
      });

    }


    const results = {};


    for (const target of targets) {

      if (!CURRENCIES[target]) {

        results[target] = {
          error: "Unsupported currency"
        };

        continue;

      }


      const rate =
        getRate(from, target);


      results[target] = {

        rate: round(rate, 8),

        converted:
          round(amount * rate, 2)

      };

    }


    res.json(
      createResponse({

        from,

        amount,

        conversions: results

      })
    );

  } catch (error) {

    res.status(400).json({
      success: false,
      error: {
        code: "MULTI_CONVERSION_ERROR",
        message: error.message
      }
    });

  }

});


/*
|--------------------------------------------------------------------------
| MERCHANT PRICE CALCULATOR
|--------------------------------------------------------------------------
|
| This is one of the unique features.
|
| Example:
|
| POST /v1/merchant/price
|
| {
|   "from": "USD",
|   "to": "PHP",
|   "amount": 100,
|   "markupPercent": 3,
|   "fixedFee": 20
| }
|
|--------------------------------------------------------------------------
*/

app.post("/v1/merchant/price", (req, res) => {

  try {

    const {
      from = "USD",
      to = "PHP",
      amount,
      markupPercent = 0,
      fixedFee = 0
    } = req.body;


    if (!Number.isFinite(Number(amount))) {

      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_AMOUNT",
          message: "amount must be a number."
        }
      });

    }


    if (
      Number(markupPercent) < 0 ||
      Number(fixedFee) < 0
    ) {

      return res.status(400).json({
        success: false,
        error: {
          code: "INVALID_FEE",
          message: "Fees cannot be negative."
        }
      });

    }


    const rate =
      getRate(from, to);


    const basePrice =
      Number(amount) * rate;


    const markup =
      basePrice *
      (Number(markupPercent) / 100);


    const customerPrice =
      basePrice +
      markup +
      Number(fixedFee);


    res.json(
      createResponse({

        from: from.toUpperCase(),

        to: to.toUpperCase(),

        originalAmount:
          Number(amount),

        exchangeRate:
          round(rate, 8),

        basePrice:
          round(basePrice, 2),

        markupPercent:
          Number(markupPercent),

        markupAmount:
          round(markup, 2),

        fixedFee:
          round(Number(fixedFee), 2),

        customerPrice:
          round(customerPrice, 2)

      })
    );

  } catch (error) {

    res.status(400).json({
      success: false,
      error: {
        code: "MERCHANT_ERROR",
        message: error.message
      }
    });

  }

});


/*
|--------------------------------------------------------------------------
| API USAGE
|--------------------------------------------------------------------------
|
| GET /v1/usage
|
|--------------------------------------------------------------------------
*/

app.get("/v1/usage", (req, res) => {

  res.json(
    createResponse({
      totalRequests:
        usage.totalRequests,

      successfulRequests:
        usage.totalRequests -
        usage.failedRequests,

      failedRequests:
        usage.failedRequests
    })
  );

});


/*
|--------------------------------------------------------------------------
| SWAGGER / OPENAPI
|--------------------------------------------------------------------------
*/

const swaggerDocument = {

  openapi: "3.0.0",

  info: {

    title: "RateFlow API",

    version: "1.0.0",

    description:
      "Developer-friendly currency conversion API."

  },

  servers: [

    {
      url: "http://localhost:3000"
    }

  ],

  components: {

    securitySchemes: {

      ApiKey: {

        type: "apiKey",

        in: "header",

        name: "x-api-key"

      }

    }

  },

  security: [

    {
      ApiKey: []
    }

  ],

  paths: {

    "/v1/currencies": {

      get: {

        summary:
          "List supported currencies",

        responses: {

          "200": {
            description:
              "Currency list"
          }

        }

      }

    },


    "/v1/rates": {

      get: {

        summary:
          "Get exchange rates",

        parameters: [

          {
            name: "base",
            in: "query",
            schema: {
              type: "string"
            },
            example: "USD"
          }

        ],

        responses: {

          "200": {
            description:
              "Exchange rates"
          }

        }

      }

    },


    "/v1/convert": {

      get: {

        summary:
          "Convert currency",

        parameters: [

          {
            name: "from",
            in: "query",
            required: true,
            schema: {
              type: "string"
            },
            example: "USD"
          },

          {
            name: "to",
            in: "query",
            required: true,
            schema: {
              type: "string"
            },
            example: "PHP"
          },

          {
            name: "amount",
            in: "query",
            required: true,
            schema: {
              type: "number"
            },
            example: 100
          }

        ],

        responses: {

          "200": {
            description:
              "Conversion result"
          }

        }

      }

    },


    "/v1/convert/multi": {

      get: {

        summary:
          "Convert to multiple currencies",

        parameters: [

          {
            name: "from",
            in: "query",
            schema: {
              type: "string"
            },
            example: "USD"
          },

          {
            name: "to",
            in: "query",
            schema: {
              type: "string"
            },
            example: "PHP,EUR,JPY"
          },

          {
            name: "amount",
            in: "query",
            schema: {
              type: "number"
            },
            example: 100
          }

        ],

        responses: {

          "200": {
            description:
              "Multi-currency conversion"
          }

        }

      }

    },


    "/v1/merchant/price": {

      post: {

        summary:
          "Calculate merchant price",

        requestBody: {

          required: true,

          content: {

            "application/json": {

              schema: {

                type: "object",

                properties: {

                  from: {
                    type: "string",
                    example: "USD"
                  },

                  to: {
                    type: "string",
                    example: "PHP"
                  },

                  amount: {
                    type: "number",
                    example: 100
                  },

                  markupPercent: {
                    type: "number",
                    example: 3
                  },

                  fixedFee: {
                    type: "number",
                    example: 20
                  }

                }

              }

            }

          }

        },

        responses: {

          "200": {
            description:
              "Merchant price"
          }

        }

      }

    }

  }

};


app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


/*
|--------------------------------------------------------------------------
| 404 HANDLER
|--------------------------------------------------------------------------
*/

app.use((req, res) => {

  res.status(404).json({

    success: false,

    error: {

      code: "NOT_FOUND",

      message:
        `Endpoint ${req.method} ${req.path} does not exist.`

    }

  });

});


/*
|--------------------------------------------------------------------------
| ERROR HANDLER
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({

    success: false,

    error: {

      code: "INTERNAL_ERROR",

      message:
        "An unexpected error occurred."

    }

  });

});


/*
|--------------------------------------------------------------------------
| START SERVER
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {

  console.log(
    `RateFlow API running on port ${PORT}`
  );

});
