const { ExerciseModel } = require("../../db/").models;
const saveDoc = require("./saveDoc")
const getCustomObjectId = require("./getCustomObjectId")



async function createExercise(exerciseData) {
  exerciseData["_id"] = getCustomObjectId("exerc")

  const exercise = new ExerciseModel(exerciseData);
  return await saveDoc(exercise);

}

module.exports = createExercise