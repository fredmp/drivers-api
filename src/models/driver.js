const mongoose = require('mongoose');
const DriverSchema = require('../schemas/driver');

const Driver = mongoose.model('driver', DriverSchema, 'drivers');

module.exports = Driver;
