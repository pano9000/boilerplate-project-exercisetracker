const findDoc = require("../../../services/db/findDoc");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");

async function usersGet(req, res) {

  try {
    const { page, limit, sortBy, sort } = req.query;

    const sortOptions = [[ sortBy, sort ]];
    const queryOptions = getQueryOptions(page, limit)

    const dbModelName = req._dbModelName

    const findResult = await findDoc.findAll(dbModelName, null, sortOptions, queryOptions);
    const pagination = await getPaginationData(page, limit, dbModelName)

    res.status(200).json({ data: findResult, pagination });
  }
  catch(error) {
    console.log(error)
    res.status(500).json({"error": "Getting User List Failed, Please try again later"});
  }

}

module.exports = usersGet