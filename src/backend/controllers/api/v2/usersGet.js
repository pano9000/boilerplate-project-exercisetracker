const findUser = require("../../../services/db/findUser");


async function usersGet(req, res) {

  try {
    const { sortBy, sort } = req.query;
    const sortOptions = [[sortBy || "username", sort || 1]];

    const findResult = await findUser.findAll(null, sortOptions); //TODO: check if pagination of results should be a thing?

    res.status(200).json(findResult);
  }
  catch(error) {
    res.status(500).json({"error": "Getting User List Failed, Please try again later"});
  }

}

module.exports = usersGet