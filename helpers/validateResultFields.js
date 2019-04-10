const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateResultFields(data) {

  let errors = {}

  data.rank = !isEmpty(data.rank) ? data.rank : ''
  data.country = !isEmpty(data.country) ? data.country : ''
  data.athlete = !isEmpty(data.athlete) ? data.athlete : ''
  data.time = !isEmpty(data.time) ? data.time : ''



  if (!Validator.isNumeric(data.rank)) {
    errors.rank = 'Rank must be a number.'
  }
  if (Validator.isEmpty(data.rank)) {
    errors.rank = 'Rank is required.'
  }
  if (Validator.isEmpty(data.country)) {
    errors.country = 'Country is required.'
  }
  if (Validator.isEmpty(data.athlete)) {
    errors.athlete = 'Athlete name is required.'
  }
  if (Validator.isEmpty(data.time)) {
    errors.time = 'Time is required.'
  }


  return {
    errors,
    isValid: isEmpty(errors)

  }
}