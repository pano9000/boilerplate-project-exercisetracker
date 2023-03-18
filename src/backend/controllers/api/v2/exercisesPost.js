const createExercise = require("../../../services/db/createExercise");
const findUser = require("../../../services/db/findUser");


async function exercisesPost(req, res) {

  try {

    const exerciseDataForDB = {

      userId: req.params.userId,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    }

    const saveResult = await createExercise(exerciseDataForDB);

    if (!saveResult) {
      throw new Error("saving failed") //TODO: better error message handling
    }

    const usernameResult = await findUser.findOne({_id: saveResult.userId})

    if (usernameResult === null) {
      throw new Error(`Username not found`)
    }

    const response = {
      exerc_id: saveResult._id,
      user_id: saveResult.userId,
      username: usernameResult.username,
      description: saveResult.description,
      duration: saveResult.duration,
      date: (new Date(`"${saveResult.date}"`)).toISOString(), // formatted date, as requested by FCC,
    }

    res.status(201).json(response);

  }

  catch(error) {

    console.log("error in exercisesPost", error.message)
    res.status(500).json({"error": `Creating exercise Failed, Reason: ${error.message}`});

  }


}

module.exports = exercisesPost