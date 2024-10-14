const express = require('express')
const app = express()
const perfiosRouter = require('./routes/perfiosRouter')
const dmsRouter = require('./routes/dmsRouter')
const {sendEmail} = require("./nodemailer")
const {fetchCloudwatchLogs} = require('./fetchCloudwatchLogs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Global Error in server!');
});

const port = 3000

const INTEGRATION_NAME = {
    PERFIOS : 'Perfios',
    HUNTER : 'Hunter',
    POSIDEX : 'Posidex',
    CIBIL : 'Cibil',
    DMS : 'Dms',
    NO_INTEGRATION_NAME : 'no-integration-name'
}

app.get('/', (req, res) => {
    res.send('Server is OK')
})

app.get('/send-email', (req, res) => {
    sendEmail();
    res.send('Send Email function called successfully')
})

app.get('/fetch-cloudwatch-logs', (req, res) => {
    const fetchCloudwatchLogsResult = fetchCloudwatchLogs()
    if(fetchCloudwatchLogsResult != null) res.send('Cloudwatch logs fetched successfully')
    else res.send('Cloudwatch logs fetch failed')
})

app.post('/submit-response', (req, res) => {
    console.log('salesforce-submit-response API called...')
    if(req.body.status === 'success')
        res.json({
            "api_name": "salesforce-submit-response",
            "message": "Request executed successfully",
            "original_event_data": req.body
        })
    
    else if(req.body.status === 'fail')
        res.json({
            "api_name": "salesforce-submit-response",
            "message": "Request failed",
            "original_event_data": req.body
        })

    else res.json({
        "api_name": "salesforce-submit-response",
        "message": "Unknown request",
        "original_event_data": req.body
    })
})

app.use('/perfios', perfiosRouter)
app.use('/dms', dmsRouter)

app.post('/hunter', (req, res) => {
    console.log('Hunter API called...')
    if(req.body.statusCode){
        if(req.body.integration_name === INTEGRATION_NAME.HUNTER){
            res.json({
                "integration_name" : INTEGRATION_NAME.HUNTER,
                "api_name" : "hunter",
                "statusCode" : req.body.statusCode,
                "message" : req.body.statusCode != 200 ? "Fail" : "OK",
                "data" : []
            })
        }
        else {
            res.json({
                "integration_name" : INTEGRATION_NAME.HUNTER,
                "api_name" : "hunter",
                "statusCode" : req.body.statusCode,
                "message" : "integration_name is not Hunter",
                "data" : []
            })
        }
    }
    else
        res.json({
            "integration_name" : INTEGRATION_NAME.HUNTER,
            "api_name" : "hunter",
            "statusCode" : "400",
            "message" : "statusCode not provided",
            "data" : []
        })
})

app.post('/posidex', (req, res) => {
    console.log('Posidex API called...')
    if(req.body.statusCode){
        if(req.body.integration_name === INTEGRATION_NAME.POSIDEX){
            res.json({
                "integration_name" : INTEGRATION_NAME.POSIDEX,
                "api_name" : "posidex",
                "statusCode" : req.body.statusCode,
                "message" : req.body.statusCode != 200 ? "Fail" : "OK",
                "data" : []
            })
        }
        else {
            res.json({
                "integration_name" : INTEGRATION_NAME.POSIDEX,
                "api_name" : "posidex",
                "statusCode" : req.body.statusCode,
                "message" : "integration_name is not Posidex",
                "data" : []
            })
        }
    }
    else
        res.json({
            "integration_name" : INTEGRATION_NAME.POSIDEX,
            "api_name" : "posidex",
            "statusCode" : "400",
            "message" : "statusCode not provided",
            "data" : []
        })
})

app.post('/cibil', (req, res) => {
    console.log('Cibil API called...')
    if(req.body.statusCode){
        if(req.body.integration_name === INTEGRATION_NAME.CIBIL){
            res.json({
                "integration_name" : INTEGRATION_NAME.CIBIL,
                "api_name" : "cibil",
                "statusCode" : req.body.statusCode,
                "message" : req.body.statusCode != 200 ? "Fail" : "OK",
                "data" : []
            })
        }
        else {
            res.json({
                "integration_name" : INTEGRATION_NAME.CIBIL,
                "api_name" : "cibil",
                "statusCode" : req.body.statusCode,
                "message" : "integration_name is not Cibil",
                "data" : []
            })
        }
    }
    else
        res.json({
            "integration_name" : INTEGRATION_NAME.CIBIL,
            "api_name" : "cibil",
            "statusCode" : "400",
            "message" : "statusCode not provided",
            "data" : []
        })
})

app.post('/no-integration-name', (req, res) => {
    console.log('No-integration-name API called...')
    if(req.body.statusCode){
        if(req.body.integration_name === INTEGRATION_NAME.NO_INTEGRATION_NAME){
            res.json({
                "integration_name" : INTEGRATION_NAME.NO_INTEGRATION_NAME,
                "api_name" : "no-integration-name",
                "statusCode" : req.body.statusCode,
                "message" : req.body.statusCode != 200 ? "Fail" : "OK",
                "data" : []
            })
        }
        else {
            res.json({
                "integration_name" : INTEGRATION_NAME.NO_INTEGRATION_NAME,
                "api_name" : "no-integration-name",
                "statusCode" : req.body.statusCode,
                "message" : "integration_name is not No-integration-name",
                "data" : []
            })
        }
    }
    else
        res.json({
            "integration_name" : INTEGRATION_NAME.NO_INTEGRATION_NAME,
            "api_name" : "no-integration-name",
            "statusCode" : "400",
            "message" : "statusCode not provided",
            "data" : []
        })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})


