const { UserModel } = require("../../db/").models;
const saveDoc = require("./saveDoc")

const getCustomObjectId = require("./getCustomObjectId")


async function createUser(userData) {
    userData["_id"] = getCustomObjectId("user")
    const user = new UserModel(userData);
    return await saveDoc(user);

}

module.exports = createUser