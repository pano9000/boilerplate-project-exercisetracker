const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const routes = require("./src/backend/routes/")

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);


module.exports = app