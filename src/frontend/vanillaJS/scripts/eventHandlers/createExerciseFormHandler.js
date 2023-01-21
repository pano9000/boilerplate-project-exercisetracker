const { sendToAPI, showMessage } = require("../utils");

async function createexerciseFormHandler(event) {
  const element = event.target;

  console.log(element, event.target, event)

  event.preventDefault();

  const formData = new FormData(element)
  const serverUrl = element.action.replace(":userId", formData.get("userId"));
  console.log(serverUrl)
  console.log(formData)
  const response = await sendToAPI.post(serverUrl, formData);

  const message = `User Exercise Successfully created: ${response.username} / ${response._id}`

  showMessage(element.lastElementChild, message, "ok")

  
  console.log(response)

}

module.exports = createexerciseFormHandler