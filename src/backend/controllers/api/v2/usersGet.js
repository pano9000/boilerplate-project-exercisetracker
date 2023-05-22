const findDoc = require("../../../services/db/findDoc");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");

async function usersGet(req, res) {

  try {
    const { page, limit, sortBy, sortOrder, searchFor, searchIn } = req.query;
    const dbModelName = req._dbModelName
    const sortOptions = [[ sortBy, sortOrder ]];

    const searchQuery = (() => {
      const searchKey = ([undefined, null].includes(searchIn) === true) ? "username" : searchIn; //@TODO: do not hardcode 'username' here?

      if ([undefined, null].includes(searchFor) === false) {
        return { [searchKey]: new RegExp(searchFor, "i") };
      }
      return (searchFor === undefined) ? null : { [searchKey]: null }
    })()

    const pagination = await getPaginationData(page, limit, dbModelName, searchQuery);
    const queryOptions = getQueryOptions(pagination.currentPage, limit)

    const findResult = await findDoc.findAll(dbModelName, searchQuery, sortOptions, queryOptions);

    res.status(200).json({ data: findResult, pagination });
  }
  catch(error) {
    console.log(error)
    res.status(500).json({"error": `Getting User List Failed, Reason: ${error.message}`});
  }

}

module.exports = usersGet