
module.exports = function(page, limit) {

  return {
    limit,
    skip: ((page - 1) * limit)
  }
}
