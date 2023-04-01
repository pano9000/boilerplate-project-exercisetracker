const existsDoc = require("../../../services/db/existsDoc");

module.exports = async function(req, res) {

  try {
    const queryUsername = req.query.username;
    if (queryUsername === undefined) {
      return res.sendStatus(400);
    }

    const existsResult = await existsDoc("UserModel", { username: queryUsername });

    return (existsResult === null) ? res.sendStatus(404) : res.sendStatus(204);

  }
  catch(error) {
    return res.sendStatus(500);
  }

}
