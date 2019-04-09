const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  results: [
    {
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
    }
  ]
})

module.exports = Event = mongoose.model('events', EventSchema)