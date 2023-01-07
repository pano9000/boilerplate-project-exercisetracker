const { UserModel } = require("../../db/").models;
const saveDoc = require("./saveDoc")

async function createUser(username) {

    const user = new UserModel({ username });
    return await saveDoc(user);

}

module.exports = createUser