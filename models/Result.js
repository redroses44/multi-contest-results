const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  rank: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  athlete: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  points: {
    type: Number
  }
})

module.exports = Result = mongoose.model('results', ResultSchema)