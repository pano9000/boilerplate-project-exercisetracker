const dbConnection = require("../dbConnection");

const UserSchema = new dbConnection.Schema({

  //_id: -> gets auto-added

  username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: /^[0-9a-z-_]{3,30}$/
  },

  _id: {
    type: String,
    required: true,
    match: /^[a-zA-Z]{1,5}_[0-9a-f]{24}$/
  }
}, { _id: false }) // disable default _id -> necessary to enable custom -

module.exports = UserSchema
