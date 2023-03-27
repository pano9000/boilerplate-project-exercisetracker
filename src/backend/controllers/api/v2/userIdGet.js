const findDoc = require("../../../services/db/findDoc");

async function userGet(req, res) {

  try {
    const { userId } = req.params
    const findResult = await findDoc.findOne( "UserModel", { _id: userId } );

    if (!findResult) {
      throw new Error()
    }
    res.status(200).json(findResult);
  }
  catch(error) {
    res.status(500).json({"error": "Getting User Failed, Please try again later"});
  }

}

module.exports = userGet