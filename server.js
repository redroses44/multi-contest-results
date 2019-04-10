const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

const port = process.env.PORT || 5000;
const db = require('./config/keys').mongoURI;

const results = require('./routes/api/results')
const events = require('./routes/api/events')

app.use('/api/results', results)
app.use('/api/events', events)

mongoose
  .connect(db)
  .then(() => console.log('mongo connection works'))
  .catch(err => console.log(err))

app.listen(port, () => console.log(`Server started on port ${port}`))

