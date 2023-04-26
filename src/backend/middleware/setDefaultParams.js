const dbModel =  require("../db/").models

module.exports = function(dbModelName) {

  return (req, res, next) => {

    try {
      req.query.page = parseInt(req.query.page) || 1;
      req.query.limit = parseInt(req.query.limit) || 10;
      req.query.sortBy = req.query.sortBy || dbModel[dbModelName]["sortByDefault"];
      req.query.sortOrder = parseInt(req.query.sortOrder) || 1;
  
      req._dbModelName = dbModelName
  
      next()
    }
    catch(error) {
      console.log(error)
      res.status(500).json({"error": `Unexpected Server Error`});
    }

  }

}