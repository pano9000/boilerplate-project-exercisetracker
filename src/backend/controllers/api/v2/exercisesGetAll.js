const findDoc = require("../../../services/db/findDoc");
const createSearchObject = require("../../../services/db/utils/createSearchObject");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");


async function exercisesGetAll(req, res) {

  try {
    const { from: filterDateFrom, to: filterDateTo, page, limit, sortBy, sortOrder, searchFor, searchIn } = req.query;
    const dbModelName = req._dbModelName


    const opt = { userId: undefined, filterDateFrom: filterDateFrom, filterDateTo: filterDateTo };
    const searchObject = createSearchObject.exerciseLog( opt );
    delete searchObject.userId

    const searchQuery = (() => {
      const searchKey = ([undefined, null].includes(searchIn) === true) ? "description" : searchIn; //@TODO: do not hardcode 'description' here?

      if ([undefined, null].includes(searchFor) === false) {
        searchObject[searchKey] = new RegExp(searchFor, "i");
        return;
      }
      searchObject[searchKey] = null
    })()

    const pagination = await getPaginationData(page, limit, dbModelName, searchObject);

    const queryOptions = getQueryOptions(pagination.currentPage, limit)
    const sortOptions = [ [sortBy, sortOrder] ];

    const findResult = await findDoc.findAll(dbModelName, searchObject, sortOptions, queryOptions);

    //findResult is always an array it, either empty or filled - undefined errors are caught in findExercises already, so no need to handle them here anymore
    const response = {
      data: {
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
      },
      pagination
    }

    res.status(200).json(response);

  }
  catch(error) {
    res.status(500).json({"error": `Getting Exercise List Failed, Reason: ${error.message}`});

  }


}

module.exports = exercisesGetAll