const express = require('express')
const router = express.Router()

const Result = require('../../models/Result')
const validateResultFields = require('../../helpers/validateResultFields')


//ADD NEW RESULT

router.post('/', (req, res) => {

  const { errors, isValid } = validateResultFields(req.body)

  if (!isValid) {
    return res.json(400, errors)
  }

  Result.findOne({ athlete: req.body.athlete })
    .then(result => {
      if (result) {
        errors.result = 'This athlete already has a result'
        return res.json(400, errors)
      } else {
        const newResult = new Result({
          rank: req.body.rank,
          country: req.body.country,
          athlete: req.body.athlete,
          time: req.body.time,
          points: req.body.points,
          eventName: req.body.eventName
        })
        newResult.save().then(result => res.json(result))
      }
    }).catch(err => console.log(err))
})

//GET RESULTS BY EVENTNAME

router.get('/:eventName', (req, res) => {
  Result.find()
    .then(results => {
      const filteredResults = results
        .filter(result => result.eventName === req.params.eventName)
      res.json(filteredResults)
    }).catch(err => console.log(err))
})

//SORT RESULTS BY POINTS ASCENDING

router.get('/filter/asc/:eventName', (req, res) => {
  Result.find()
    .sort({ points: 1 })
    .then(results => {
      const filteredResults = results
        .filter(result => result.eventName === req.params.eventName)
      res.json(filteredResults)
    }).catch(err => console.log(err))
})

//SORT RESULTS BY POINTS DESCENDING

router.get('/filter/desc/:eventName', (req, res) => {
  Result.find()
    .sort({ points: -1 })
    .then(results => {
      const filteredResults = results
        .filter(result => result.eventName === req.params.eventName)
      res.json(filteredResults)
    }).catch(err => console.log(err))
})

//GET ALL RESULTS

router.get('/', (req, res) => {
  Result.find()
    .then(results => res.json(results))
    .catch(err => console.log(err))
})

//GET RESULT BY ID

router.get('/:id', (req, res) => {
  Result.findById(req.params.id)
    .then(result => {
      if (!result) {
        return res.json(404, {
          error: 'Result does not exist.'
        })
      } else {
        return res.json(result)
      }
    }).catch(err => console.log(err))
})


//DELETE RESULT BY ID

router.delete('/:id', (req, res) => {
  Result.findById(req.params.id)
    .then(result => {
      result.remove().then(result => res.json(result))
    })
})

//UPDATE RESULT 

router.put('/:id', (req, res) => {
  Result.findByIdAndUpdate(req.params.id)
    .then(result => {
      if (!result) {
        return res.json(404, {
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
        result.save().then(res.json(result))
      }
    })
})


module.exports = router