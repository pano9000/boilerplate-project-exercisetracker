const exerciseUpdate = require("../../../services/db/exerciseUpdate");

module.exports = async function(req, res) {

  try {

    const updatedData = req.body;
    const saveResult = await exerciseUpdate(req.params, updatedData);
    res.status(201).json(saveResult);
  }

  catch(error) {
    res.status(500).json({"error": `Updating Exercise Failed. ${error.message}`});
  }
}
