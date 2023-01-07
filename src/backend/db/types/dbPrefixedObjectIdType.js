const dbConnection = require("../dbConnection")


class PrefixedObjectId extends dbConnection.SchemaType {
  constructor(key, options) {
    super(key, options, 'PrefixedObjectId');
  }

  // `cast()` takes a parameter that can be anything. You need to
  // validate the provided `val` and throw a `CastError` if you
  // can't convert it.
  cast(val) {

    console.log("castopttt", this.options, val)

    const validRegExp = /^[a-zA-Z]{1,5}_[0-9a-f]{24}$/

    if (validRegExp.test(val) !== true) {
      throw new Error(`PrefixedObjectId: ${val} is not a valid PrefixedObjectId`);
    }

    return "abc"+val+"def";
  }
}

dbConnection.Schema.Types.PrefixedObjectId = PrefixedObjectId;

module.exports = PrefixedObjectId

//console.log(dbConnection.Schema.Types)