const findDoc = require("../../../services/db/findDoc")

module.exports = async function(req, res) {

  try {
    const queryUsername = req.query.username

    if (queryUsername === undefined) {
      return res.sendStatus(400);
    }

    const result = await findDoc.findOne("UserModel", { username: queryUsername });

    if (result !== null) {
      return res.sendStatus(204);
    }

    return res.sendStatus(404);
  }
  catch(error) {
    return res.sendStatus(500)
  }




}
