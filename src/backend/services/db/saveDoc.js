/**
 * @param {MongooseDoc} doc 
 * @returns {Promise} 
 */
async function saveDoc(doc) {

  try {

    return await doc.save();

  }
  catch(error) {

    //TODO: do some fancy error handling here, with more meaningful error messages
    console.log("creating user failed", error)
    throw new Error("creating user failed")

  }

}

module.exports = saveDoc