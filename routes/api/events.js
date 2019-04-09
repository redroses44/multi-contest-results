const express = require('express')
const router = express.Router()

const Event = require('../../models/Event')

const validateEventFields = require('../../helpers/validateEventFields')


//ADD EVENT

router.post('/', async (req, res) => {
  const { isValid, errors } = validateEventFields(req.body)

  if (!isValid) {
    res.json(400, errors)
  }
  const event = await Event.findOne({ name: req.body.name })
  if (event) {
    res.json(404, {
      error: 'Event with that name already exists.'
    })
  } else {
    const newEvent = new Event({
      name: req.body.name
    })
    await newEvent.save().then(event => res.json(event))
  }
})


//GET EVENT

router.get('/:id', (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      res.json(event)
    })
})

//GET ALL EVENTS

router.get('/', (req, res) => {
  Event.find()
    .then(events => res.json(events))
})

module.exports = router