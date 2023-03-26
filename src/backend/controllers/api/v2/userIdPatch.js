const userUpdate = require("../../../services/db/userUpdate");

module.exports = async function(req, res) {

  try {
    const { userId } = req.params;
    const updatedData = req.body;
    const saveResult = await userUpdate(userId, updatedData);
    res.status(201).json( { username: saveResult.username, _id: saveResult._id});
  }

  catch(error) {
    res.status(500).json({"error": `Updating User Failed. ${error.message}`});
  }
}
