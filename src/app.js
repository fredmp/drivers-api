const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/index');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/drivers-api');

app.use(bodyParser.json());
routes(app);

module.exports = app;
