const findDoc = require("../../../services/db/findDoc");
const countDoc = require("../../../services/db/countDoc");
const createSearchObject = require("../../../services/db/utils/createSearchObject");


async function exercisesGetAll(req, res) {

  try {
    const { from: filterDateFrom, to: filterDateTo } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "date";
    const sort = parseInt(req.query.sort) || 1;

    const queryOptions = {
      limit,
      skip: ((page - 1) * limit)
    }

    const sortOptions = [ [sortBy, sort] ];

    const opt = { userId: undefined, filterDateFrom: filterDateFrom, filterDateTo: filterDateTo };
    const searchObject = createSearchObject.exerciseLog( opt )
    delete searchObject.userId
    const findResult = await findDoc.findAll("ExerciseModel", searchObject, sortOptions, queryOptions); //TODO: check if pagination of results should be a thing?

    const totalEntries = await countDoc("ExerciseModel");

    const pagination = {
      "currentPage": page,
      "totalPages": Math.ceil(totalEntries / limit),
      totalEntries,
    }

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
      }),
      pagination
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = exercisesGetAll