const { ObjectId } = require("../../../db/dbConnection").Types

function getCustomObjectId(prefix) {
  const objectId = ObjectId().toString()
  return `${prefix}_${objectId}`
}

module.exports = getCustomObjectId