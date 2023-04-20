const findDoc = require("../../../services/db/findDoc");
const getPaginationData = require("../../../services/getPaginationData");
const getQueryOptions = require("../../../services/getQueryOptions");

async function usersGet(req, res) {

  try {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "username";
    const sort = parseInt(req.query.sort) || 1;

    const sortOptions = [[ sortBy, sort ]];
    const queryOptions = getQueryOptions(page, limit ||10)

    const dbModelName = "UserModel"

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