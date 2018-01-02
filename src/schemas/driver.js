const mongoose = require('mongoose');
const PointSchema = require('./point')
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

module.exports = DriverSchema;
