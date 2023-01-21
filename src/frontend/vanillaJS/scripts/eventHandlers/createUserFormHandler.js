const { sendToAPI, showMessage } = require("../utils")

async function createuserFormHandler(event) {
  const element = event.target;
  console.log(element, event.target, event)

  event.preventDefault();
  const serverUrl = element.action;
  const formData = new FormData(element)
  console.log(formData)
  const response = await sendToAPI.post(serverUrl, formData);

  const message = `User Successfully created: ${response.username} / ${response._id}`

  showMessage(element.lastElementChild, message, "ok")


  console.log(response)

}

module.exports = createuserFormHandler