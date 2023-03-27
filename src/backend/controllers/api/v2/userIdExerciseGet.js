const findDoc = require("../../../services/db/findDoc");


module.exports = async function userIdExerciseGet(req, res) {

  try {

    const findResult = await findDoc.findOne("ExerciseModel", {_id: req.params.exerciseId}); //TODO: check if pagination of results should be a thing?

    if (findResult === undefined) {
      throw new Error(`Unknown error. Received 'undefined'`)
    }

    if (findResult === null) {
      throw new Error(`No Exercise with Id ${req.params.exerciseId} found`)
    }

    const { description, duration, date, _id, userId } = findResult;
    const response = {
      _id,
      userId,
      description,
      duration,
      date
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise Failed, Reason: ${error.message}`});
  }

}