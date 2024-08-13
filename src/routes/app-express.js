const express = require('express')
const app = express()
var cors = require('cors')
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // analisa o corpo das requisições HTTP
app.use(cors()) // middleware para permitir requisições de outros domínios

module.exports = app