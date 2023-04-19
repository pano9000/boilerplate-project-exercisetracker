const countDoc = require("./db/countDoc");


module.exports = async function getPaginationData(page, limit, dbModelName, searchQuery) {

  const totalEntries = await countDoc(dbModelName, searchQuery);

  return {
    "currentPage": page,
    "totalPages": Math.ceil(totalEntries / limit),
    "totalEntries": totalEntries,
  }

}