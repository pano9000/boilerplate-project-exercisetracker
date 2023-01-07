const dbConnection = require("../dbConnection");

const UserSchema = new dbConnection.Schema({

  //_id: -> gets auto-added

  username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
    match: /^[0-9a-z-_]{3,20}$/
  },
})

module.exports = UserSchema
