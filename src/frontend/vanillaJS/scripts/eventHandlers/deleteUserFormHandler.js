const { sendToAPI } = require("../utils")

async function deleteUserFormHandler(event) {
  const element = event.target;
  //console.log(element, event.target, event)

  event.preventDefault();
  const formData = new FormData(element)
  console.log(formData)

  const serverUrl = element.action.replace(":userId", formData.get("userId"));
  const response = await sendToAPI.delete(serverUrl, formData);

  console.log(response)

}

module.exports = deleteUserFormHandler