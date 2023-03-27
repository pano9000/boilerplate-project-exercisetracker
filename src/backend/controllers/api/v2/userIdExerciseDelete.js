const deleteDoc = require("../../../services/db/deleteDoc");

module.exports = async function exerciseDelete(req, res) {

  try {
    const { exerciseId } = req.params
    const findResult = await deleteDoc.deleteOne( "ExerciseModel", { _id: exerciseId } );

    if (!findResult) {
      return res.status(404).json({ "msg": "exercise not found"})
    }

    res.sendStatus(204);
  }
  catch(error) {
    res.status(500).json({"error": "Deleting exercise failed, Please try again later"});
  }

}