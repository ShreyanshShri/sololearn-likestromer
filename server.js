require('dotenv').config()
const express = require('express')
const app = express()
const puppeteer = require('puppeteer')

const sendStrom = require('./send_strom')

app.use(express.urlencoded({extended : false}))

const email = process.env.EMAIL
const password = process.env.PASSWORD

app.get('/', (req, res) => {
    sendStrom(email, password, '14155522').catch(err => console.log(err))
    res.send('Hello')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on port ${port}`))