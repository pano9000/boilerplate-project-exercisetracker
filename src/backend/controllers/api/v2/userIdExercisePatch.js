const updateDoc = require("../../../services/db/updateDoc");

module.exports = async function(req, res) {

  try {

    const updatedData = req.body;
    const filter = {
      _id: req.params.exerciseId,
      userId: req.params.userId
    };
    const saveResult = await updateDoc("ExerciseModel", filter, updatedData);
    res.status(201).json(saveResult);
  }

  catch(error) {
    res.status(500).json({"error": `Updating Exercise Failed. ${error.message}`});
  }
}
