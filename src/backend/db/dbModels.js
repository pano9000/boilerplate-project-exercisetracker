const dbConnection = require("./dbConnection");
const dbSchemas = require("./schemas")

const UserModel = { 
  model: dbConnection.model("UserDoc", dbSchemas.UserSchema),
  idPrefix: "user"
};

const ExerciseModel = {
  model: dbConnection.model("ExerciseDoc", dbSchemas.ExerciseSchema),
  idPrefix: "exerc"
};

module.exports = { UserModel, ExerciseModel }