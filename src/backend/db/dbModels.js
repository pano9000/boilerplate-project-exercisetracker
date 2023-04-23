const dbConnection = require("./dbConnection");
const dbSchemas = require("./schemas")

const UserModel = { 
  model: dbConnection.model("UserDoc", dbSchemas.UserSchema),
  idPrefix: "user",
  sortByDefault: "username"
};

const ExerciseModel = {
  model: dbConnection.model("ExerciseDoc", dbSchemas.ExerciseSchema),
  idPrefix: "exerc",
  sortByDefault: "date"
};

module.exports = { UserModel, ExerciseModel }