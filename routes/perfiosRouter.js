const express = require('express')
const router = express.Router()

// Middleware to validate integration_name
const validateIntegrationName = (req, res, next) => {
    if (req.body.integration_name !== 'Perfios') {
        return res.status(400).json({
            "integration_name": "Perfios",
            "api_name" : "",
            "statusCode": "400",
            "message": "integration_name is not Perfios",
            "data" : []
        });
    }
    next();
};

/**
 * @description Fetch account details
*/
router.post('/getAccountDetails', validateIntegrationName, (req, res) => {
    console.log("API invoked: /perfios/getAccountDetails")
    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message": req.body.statusCode != "200" ? "Failed to fetch accounts" : "Get Account Details fetched successfully",
        "data": {
          "accounts": req.body.statusCode != "200" ? [] : [
            {
              "accountNumber": "123456789",
              "bankName": "Bank A",
              "balance": 1500.00,
              "currency": "USD"
            },
            {
              "accountNumber": "987654321",
              "bankName": "Bank B",
              "balance": 2500.00,
              "currency": "USD"
            }
          ]
        }
      })
});

/**
 * @description Fetch account transaction history
*/
router.post('/getTransactionHistory', validateIntegrationName, (req, res) => {
    console.log("API invoked: /perfios/getTransactionHistory")
    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message": req.body.statusCode != "200" ? "Failed to fetch transaction ids" : "Get Transaction History fetched successfully",
        "data": {
          "transactions": req.body.statusCode != "200" ? [] : [
            {
              "date": "2024-09-01",
              "description": "Deposit",
              "amount": 500.00,
              "balanceAfterTransaction": 2000.00
            },
            {
              "date": "2024-09-05",
              "description": "Withdrawal",
              "amount": -100.00,
              "balanceAfterTransaction": 1900.00
            }
          ]
        }
      })

});

/**
 * @description Fetch credit score
*/
router.post('/getCreditScore', validateIntegrationName, (req, res) => {
    console.log("API invoked: /perfios/getCreditScore")
    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message": req.body.statusCode != "200" ? "Failed to fetch credit score" : "Get Credit Score fetched successfully",
        "data": req.body.statusCode != "200" ? "[]" : {
          "creditScore": 750,
          "factorsAffectingScore": [
            {
              "factor": "Payment History",
              "impact": "+40"
            },
            {
              "factor": "Credit Utilization",
              "impact": "-20"
            }
          ]
        }
      })
});

module.exports = router

