const { ExerciseModel } = require("../../db/").models;
const saveDoc = require("./saveDoc")
const getCustomObjectId = require("./getCustomObjectId")



async function createExercise(exerciseData) {

  //exerciseData["_id"] = getCustomObjectId("exerc")

  const exerciseDoc = new ExerciseModel(exerciseData);
  return await saveDoc(exerciseDoc);

}

function abc(exerciseData) {
  const exerciseDoc = new ExerciseModel(exerciseData);

  console.log(exerciseDoc)
  console.log(ExerciseModel.schema.paths)
}

abc(2)

module.exports = createExercise