const { UserModel } = require("../../db/").models;
const saveDoc = require("./saveDoc")

async function createUser(userData) {

    const user = new UserModel(userData);
    return await saveDoc(user);

}

module.exports = createUser