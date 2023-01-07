const findUser = require("../../services/db/findUser");


async function usersGet(req, res) {

  try {
    const findResult = await findUser.findAll(); //TODO: check if pagination of results should be a thing?
    
    if (!findResult) {
      throw new Error("Getting User List Failed")
    }


    res.status(200).json(findResult);
  }
  catch(error) {
    res.status(500).json({"error": "Getting User List Failed, Please try again later"});


  }

}

module.exports = usersGet