const countDoc = require("./db/countDoc");


module.exports = async function getPaginationData(page, limit, dbModelName, searchQuery) {

  const totalEntries = await countDoc(dbModelName, searchQuery);
  const totalPages = Math.ceil(totalEntries / limit);

  return {
    currentPage: (page > totalPages) ? totalPages : page,
    totalPages,
    totalEntries,
  }

}