const dbModels = require("../../db/").models;
const getCustomObjectId = require("./getCustomObjectId");
const saveDoc = require("./saveDoc")


module.exports = async function(dbModel, docData) {
  docData["_id"] = getCustomObjectId(dbModels[dbModel]["idPrefix"]);
  const newDoc = new dbModels[dbModel]["model"](docData)
  return await saveDoc(newDoc)
}