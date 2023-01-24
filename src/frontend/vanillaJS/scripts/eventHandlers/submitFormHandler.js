const { sendToAPI, showMessage } = require("../utils");

async function submitFormHandler(event) {

  event.preventDefault();
  const element = event.target;
  console.log(element, event.target, event)

  const formData = new FormData(element);
  const serverUrl = element.action.replace(/:userId:/, formData.get("userId"));

  console.log(serverUrl)
  console.log(formData)
  const response = await sendToAPI[element.method](serverUrl, formData);

  const message = `User Exercise Successfully created: ${response.username} / ${response._id}`

  showMessage(element.lastElementChild, message, "ok")


  console.log(response)


}
module.exports = submitFormHandler
