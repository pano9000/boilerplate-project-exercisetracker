const dbModel =  require("../db/").models

module.exports = function(dbModelName) {

  return (req, res, next) => {

    req.query.page = parseInt(req.query.page) || 1;
    req.query.limit = parseInt(req.query.limit) || 10;
    req.query.sortBy = req.query.sortBy || dbModel[dbModelName]["sortByDefault"];
    req.query.sort = parseInt(req.query.sort) || 1;

    req._dbModelName = dbModelName

    next()

  }

}