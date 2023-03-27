const deleteDoc = require("../../../services/db/deleteDoc");


async function userDelete(req, res) {

  try {
    const { userId } = req.params
    const findResult = await deleteDoc.deleteOne( "UserModel", { _id: userId } );

    if (!findResult) {
      return res.status(404).json({ "msg": "userId not found"})
    }

    res.sendStatus(204);
  }
  catch(error) {
    res.status(500).json({"error": "Deleting User Failed, Please try again later"});
  }

}

module.exports = userDelete