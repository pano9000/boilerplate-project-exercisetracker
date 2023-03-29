require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require("morgan")
const routes = require("./src/backend/routes/")
const helmet = require("helmet");

app.use(helmet());
app.use(morgan("combined"))

app.use(cors())
app.use(express.static('dist'))
app.use(express.urlencoded({ extended: true }));

app.use("/api/v2", routes.apiV2);
app.use("/api", routes.apiV1);
app.use("/", routes.frontend);


module.exports = app