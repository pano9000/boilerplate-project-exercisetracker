const findDoc = require("../../../services/db/findDoc");
const createSearchObject = require("../../../services/db/utils/createSearchObject");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");


async function userIdExercisesGetAll(req, res) {

  try {
    const { userId } = req.params
    const { from: filterDateFrom, to: filterDateTo, page, limit, sortBy, sortOrder } = req.query;
    const dbModelName = req._dbModelName

    const findUserResult = await findDoc.findOne("UserModel", { _id: userId })

    if (findUserResult === null) {
      throw new Error("user not found")
    }

    const searchObject = createSearchObject.exerciseLog( { userId, filterDateFrom, filterDateTo } )
    const pagination = await getPaginationData(page, limit, dbModelName, searchObject)

    const queryOptions = getQueryOptions(pagination.currentPage, limit)
    const sortOptions = [ [sortBy, sortOrder] ];

    const findResult = await findDoc.findAll("ExerciseModel", searchObject, sortOptions, queryOptions); //TODO: check if pagination of results should be a thing?

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      data: {
        username: findUserResult.username,
        count: findResult.length,
        user_id: findUserResult._id,
        log: findResult.map(result => {
          const { description, duration, date, _id } = result;
          return { 
            exercise_id: _id,
            description, 
            duration, 
            date
          }
        })
      },
      pagination
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = userIdExercisesGetAll