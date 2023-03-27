/**
 * @param {MongooseDoc} doc 
 * @returns {Promise} 
 */
module.exports = async function(doc) {

  try {
    return await doc.save();
  }
  catch(error) {
    //TODO: do some fancy error handling here, with more meaningful error messages
    console.log("saving doc failed", error)
    throw new Error("saving doc failed")
  }
}