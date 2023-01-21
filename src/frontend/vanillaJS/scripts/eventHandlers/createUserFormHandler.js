const { postToAPI } = require("../utils")

async function createuserFormHandler(event) {
  const element = event.target;
  console.log(element, event.target, event)

  event.preventDefault();
  const serverUrl = element.action;
  const formData = new FormData(element)
  console.log(formData)
  const response = await postToAPI(serverUrl, formData);

  console.log(response)

}

module.exports = createuserFormHandler