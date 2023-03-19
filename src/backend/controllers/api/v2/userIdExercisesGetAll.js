const findExercises = require("../../../services/db/findExercises");
const findUser = require("../../../services/db/findUser");
const createSearchObject = require("../../../services/db/createSearchObject")


async function userIdExercisesGetAll(req, res) {

  try {

    const { userId } = req.params
    if (userId === undefined || userId === null) {
      throw new Error("userId undefined/null is invalid")
    }

    const { from: filterDateFrom, to: filterDateTo, limit: filterQty, sort: optionSort } = req.query

    const findUserResult = await findUser.findOne({ _id: userId })

    if (findUserResult === null) {
      throw new Error("user not found")
    }

    const queryOptions = {
      sort: { date: optionSort || "asc" },
      limit: filterQty || 0
    }

    const searchObject = createSearchObject.exerciseLog( { userId, filterDateFrom, filterDateTo } )

    const findResult = await findExercises.findAll(searchObject, queryOptions); //TODO: check if pagination of results should be a thing?

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      username: findUserResult.username,
      count: findResult.length,
      user_id: findUserResult._id,
      log: findResult.map(result => {
        const { description, duration, date, _id } = result;
        return { 
          exercise_id: _id,
          description, 
          duration, 
          date: date
        }
      })
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = userIdExercisesGetAll