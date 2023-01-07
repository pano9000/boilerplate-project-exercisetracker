const dbConnection = require("./dbConnection");
const dbSchemas = require("./schemas")

const UserModel = dbConnection.model("UserDoc", dbSchemas.UserSchema);
const ExerciseModel = dbConnection.model("ExerciseDoc", dbSchemas.ExerciseSchema);


module.exports = { UserModel, ExerciseModel }