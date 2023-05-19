const findDoc = require("../../../services/db/findDoc");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");

async function usersGet(req, res) {

  try {
    const { page, limit, sortBy, sortOrder, query } = req.query;
    const dbModelName = req._dbModelName
    const sortOptions = [[ sortBy, sortOrder ]];
    const searchQuery = (() => {
      if ([undefined, null].includes(query) === false) {
        return { username: new RegExp(query, "i") };
      }
      return (query === undefined) ? null : { username: null }
    })()

    const pagination = await getPaginationData(page, limit, dbModelName, searchQuery);
    const queryOptions = getQueryOptions(pagination.currentPage, limit)

    console.log("reqquery", req.query.query, searchQuery, typeof(req.query.query), new RegExp(req.query.query, "i"))

    const findResult = await findDoc.findAll(dbModelName, searchQuery, sortOptions, queryOptions);

    res.status(200).json({ data: findResult, pagination });
  }
  catch(error) {
    console.log(error)
    res.status(500).json({"error": `Getting User List Failed, Reason: ${error.message}`});
  }

}

module.exports = usersGet