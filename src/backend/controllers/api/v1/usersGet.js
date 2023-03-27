const findDoc = require("../../../services/db/findDoc");

async function usersGet(req, res) {

  try {
    const findResult = await findDoc.findAll("UserModel"); //TODO: check if pagination of results should be a thing?

    res.status(200).json(findResult);
  }
  catch(error) {
    res.status(500).json({"error": "Getting User List Failed, Please try again later"});


  }

}

module.exports = usersGet