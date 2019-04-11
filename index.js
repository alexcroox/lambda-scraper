const serverless = require('serverless-http')
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const scrapePageTitle = require('./functions/scrape-title')

// Add logging of each request
app.use(morgan('tiny'))
app.use(cors())

app.get('/scrape-title', scrapePageTitle)

module.exports.handler = serverless(app)
