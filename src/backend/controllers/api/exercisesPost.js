const createExercise = require("../../services/db/createExercise");

async function exercisesPost(req, res) {


  /*
    1. gather data from body and param
    2. validate/sanitize input
    3. save data to DB
    4. prepare response in required JSON format
    5. send response as JSON back to client
  */
  try {

    console.log("exercise body:", req.body);
    console.log("paran", req.params)
    
    //TODO: less hardcoding? refactor to separate function?
    const exerciseDataForDB = {

      userId: req.params._id,
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date
    }
    //TODO: Input validation/sanitation

    const saveResult = await createExercise(exerciseDataForDB);
    console.log("saveResult", saveResult)

    if (!saveResult) {
      throw new Error("saving failed") //TODO: better error message handling
    }

    // Create response JSON in the format that FCC requires + additional properties: dateOriginal + exerc_id
    const response = {
      username: "usernameFromDB", //fetch from DB
      description: saveResult.description,
      duration: saveResult.duration,
      date: (new Date(`"${saveResult.date}"`)).toDateString(), // formatted date, as requested by FCC,
      dateOriginal: saveResult.date, //original date from DB with time
      _id: saveResult.userId, //-> this is the USERID not the exercise ID
      exerc_id: saveResult._id
    }

    console.log("response", response)

    res.status(201).json(response);

  }

  catch(error) {

    console.log("error in exercisesPost", error.message)
    res.status(500).json({"error": "Creating exercise Failed, Please try again later"});

  }


}

module.exports = exercisesPost