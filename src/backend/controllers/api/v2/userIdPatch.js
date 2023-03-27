const updateDoc = require("../../../services/db/updateDoc");

module.exports = async function(req, res) {

  try {
    const updatedData = req.body;
    const filter = {
      _id: req.params.userId
    };

    const saveResult = await updateDoc("UserModel", filter, updatedData);
    res.status(201).json( { username: saveResult.username, _id: saveResult._id});
  }

  catch(error) {
    res.status(500).json({"error": `Updating User Failed. ${error.message}`});
  }
}
