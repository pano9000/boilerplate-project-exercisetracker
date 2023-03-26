const findExercises = require("../../../services/db/findExercises");
const findUser = require("../../../services/db/findUser");
const createSearchObject = require("../../../services/db/createSearchObject")


async function exercisesGetAll(req, res) {

  try {
    
    const { from: filterDateFrom, to: filterDateTo, limit: filterQty, sortBy, sort } = req.query
    
    const queryOptions = {
      limit: filterQty || 0
    }

    const sortOptions = [[sortBy, sort]];

    const opt = { userId: undefined, filterDateFrom: filterDateFrom, filterDateTo: filterDateTo }
    const searchObject = createSearchObject.exerciseLog( opt )
    delete searchObject.userId
    const findResult = await findExercises.findAll(searchObject, sortOptions, queryOptions); //TODO: check if pagination of results should be a thing?

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      count: findResult.length,
      log: findResult.map(result => {
        const { description, duration, date, _id, userId } = result;
        return { 
          _id,
          userId,
          description, 
          duration, 
          date
        }
      })
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = exercisesGetAll