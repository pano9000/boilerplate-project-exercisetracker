const dbConnection = require("../dbConnection");

const ExerciseSchema = new dbConnection.Schema({

  //_id: -> gets auto-added

  // TODO: find out how to "link" to UserSchema's _id above 
  // -> model a "one-to-many" relation (one user <> many exercises)
  userId: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50
  },

  duration: {
    type: Number,
    required: true,
    min: 1,
    max: 999,
    validate: (durationValue) => Number.isInteger(durationValue)
  },

  date: {
    type: Date,
    required: true,
    default: Date.now,
    set: (value) => (value === '') ? Date.now() : value,
  },

  _id: {
    type: String,
    required: true,
    match: /^[a-zA-Z]{1,5}_[0-9a-f]{24}$/
  }
}, { _id: false }) // disable default _id -> necessary to enable custom -


module.exports = ExerciseSchema