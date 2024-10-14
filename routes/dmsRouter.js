const express = require('express')
const router = express.Router()

// Middleware to validate integration_name
const validateIntegrationName = (req, res, next) => {
    if (req.body.integration_name !== 'Dms') {
        return res.status(400).json({
            "integration_name": "Dms",
            "api_name": "",
            "statusCode": "400",
            "message": "integration_name is not Dms",
            "data" : []
        });
    }
    next();
};

/**
 * @description Use start-replication for initial migration, reload-target or resume-processing for updates.
*/
router.post('/startReplicationTask', validateIntegrationName, (req, res) => {
    console.log("API invoked: /dms/startReplicationTask")

    /**
     * req.body
     * 
     * {
        "integration_name": "Dms",
        "replicationTaskArn": "arn:1234"
        }
     * 
     * 
    */

    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message": req.body.statusCode != "200" ? "Failed to start Replication Task" : "Replication task started successfully",
        "data" : []
      })
});

/**
 * @description The ARN of the replication task to be stopped.
*/
router.post('/stopReplicationTask', validateIntegrationName, (req, res) => {
    console.log("API invoked: /dms/stopReplicationTask")

    /**
     * req.body
     * 
     * {
        "integration_name": "Dms",
        "replicationTaskArn": "arn:1234"
        }
     * 
     * 
    */

    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message": req.body.statusCode != "200" ? "Failed to stop Replication Task" :  "Replication task stopped successfully",
        "data" : []
      })

});

/**
 *
 * @description Lists all the replication tasks 
 * 
*/
router.post('/listReplicationTasks', validateIntegrationName, (req, res) => {
    console.log("API invoked: /dms/listReplicationTasks")
    // sample response
    res.json({
        "integration_name": req.body.integration_name,
        "api_name": req.body.api_name,
        "statusCode": req.body.statusCode,
        "message" : req.body.statusCode != "200" ? "Failed to list Replication Task" :  "Replication tasks listed successfully",
        "data":  req.body.statusCode != "200" ? [] : [
            {
                // Replication task details here
                "replicationTaskArn": "arn:1234",
            },
            {
                // Replication task details here
                "replicationTaskArn": "arn:5678",
            },
            {
                // Replication task details here
                "replicationTaskArn": "arn:2589",
            }
        ]
      })
});

module.exports = router

