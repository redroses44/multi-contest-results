const express = require('express')
const router = express.Router()

const Event = require('../../models/Event')
const Result = require('../../models/Result')
const validateResultFields = require('../../helpers/validateResultFields')


//GET RESULT BY ID

router.get('/:id', async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
    res.json(result)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})

//ADD NEW RESULT

router.post('/:eventName', async (req, res) => {

  const { errors, isValid } = validateResultFields(req.body)

  if (!isValid) {
    res.json(400, errors)
  }

  const event = await Event.findOne({ name: req.params.eventName })

  const newResult = new Result({
    rank: req.body.rank,
    country: req.body.country,
    athlete: req.body.athlete,
    time: req.body.time,
    points: req.body.points,
  })

  event.results.filter(event => event.rank === newResult.rank).length >= 1 ? res.json(400, {
    rankexists: 'Someone has that rank already.'
  }) : event.results.push(newResult)



  try {
    await event.save()
    await newResult.save()
    await res.json(newResult)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})

//UPDATE RESULT

router.put('/:eventName/:resultId', async (req, res) => {
  const event = await Event.findOne({ name: req.params.eventName })
  const index = event.results.map(result => result.id.toString()).indexOf(req.params.resultId)

  const newResult = new Result({
    rank: req.body.rank,
    athlete: req.body.athlete,
    country: req.body.country,
    time: req.body.time
  })

  event.results[index] = newResult

  await event.save()
  await newResult.save()
  await res.json(event)
})


//DELETE RESULT 

router.delete('/:eventName/:resultId', async (req, res) => {
  const event = await Event.findOne({ name: req.params.eventName })
  const removeIndex = event.results
    .map(result => result._id.toString())
    .indexOf(req.params.resultId)
  event.results.splice(removeIndex, 1)
  await event.save()
  await res.json(event)

})

//GET RESULTS BY EVENTNAME

router.get('/event/:eventName', async (req, res) => {
  const results = await Result.find()
  const filteredResults = await results
    .filter(result => result.eventName === req.params.eventName)
  try {
    await res.json(filteredResults)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})


//SORT RESULTS BY POINTS ASCENDING

router.get('/filter/asc/:eventName', async (req, res) => {
  const results = await Result
    .find()
    .sort({ points: 1 })
  const filteredResults = await results
    .filter(result => result.eventName === req.params.eventName)
  try {
    await res.json(filteredResults)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})

//SORT RESULTS BY POINTS DESCENDING

router.get('/filter/desc/:eventName', async (req, res) => {
  const results = await Result
    .find()
    .sort({ points: -1 })
  const filteredResults = await results
    .filter(result => result.eventName === req.params.eventName)
  try {
    await res.json(filteredResults)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})

//GET ALL RESULTS

router.get('/', async (req, res) => {
  const results = await Result.find()
  try {
    await res.json(results)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})


//DELETE RESULT BY ID

router.delete('/:id', async (req, res) => {
  const result = await Result.findById(req.params.id)
  try {
    await result.remove()
    await res.json(result)
  } catch (e) {
    await res.json({
      error: 'Something went wrong.'
    })
  }
})

//UPDATE RESULT 

router.put('/:id', async (req, res) => {
  const result = await Result.findByIdAndUpdate(req.params.id)
  if (!result) {
    res.json(404, {
      err: 'No result found.'
    })
  } else {
    const updatedData = {
      rank: req.body.rank,
      country: req.body.country,
      athlete: req.body.athlete,
      time: req.body.time,
      points: req.body.points
    }
    const { rank, country, athlete, time, points } = updatedData
    result.rank = rank
    result.country = country
    result.athlete = athlete
    result.time = time
    result.points = points
    try {
      await result.save()
      await res.json(result)
    } catch (e) {
      await res.json({
        error: 'Something went wrong.'
      })
    }
  }
})



module.exports = router