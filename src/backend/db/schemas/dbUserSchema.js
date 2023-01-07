const dbConnection = require("../dbConnection");
const PrefixedObjectId = require("../types/dbPrefixedObjectIdType")

const getCustomObjectId = require("../../services/db/getCustomObjectId")


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
    type: PrefixedObjectId,
    prefix: "user",
    required: true,
    
  }
}, { _id: false }) // disable default _id -> necessary to enable custom -

//const a = new PrefixedObjectId("abc")

//console.log("PrefixedObjectId imported", a)


UserSchema.pre("save", function(next) {
  console.log("******presave*****")
  //throw new Error("shita")
  this._id = "abcfef"
  next()
})

module.exports = UserSchema
