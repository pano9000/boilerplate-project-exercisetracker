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
})

module.exports = UserSchema
