const { sendToAPI, showMessage, showResult } = require("../utils");

async function submitFormHandler(event) {

  event.preventDefault();
  const element = event.target;
  console.log(element, event.target, event)
  
  const formData = new FormData(element);
  const serverUrl = element.action.replace(/:userId:/, formData.get("userId"));
  //const [formElementType, formActionType] = JSON.parse(element.dataset["forminfo"]);
  const formInfo = JSON.parse(element.dataset["forminfo"]);
  
  console.log(serverUrl)
  console.log(formData)

  console.log("method", element.method, element.id)
  const response = await sendToAPI[element.method](serverUrl, formData);

  //const message = `${formActionType} of ${formElementType} successful.`
  const message = createUiMessage(response, formInfo)
  console.log("nessssge", message)
//  const message = `User Exercise Successfully created: ${response.username} / ${response._id}`
  showMessage(element.lastElementChild, message, "ok");
  showResult(element.nextElementSibling.lastElementChild, response.data)

  console.log(response)


}


function createUiMessage(apiResponse, formInfo) {

  if (apiResponse.status === undefined) {
    return ["Unknown Error ocurred", null]
  }
  const [formElementType, formActionType] = formInfo;
  const resultOfActionVerb = (apiResponse.status === "ok") ? "successful" : "failed";
  const uiMsgHeading = `${formActionType} of ${formElementType} ${resultOfActionVerb}.`
  const uiMsgContent = apiResponse.message || null

  return [uiMsgHeading, uiMsgContent]

}

module.exports = submitFormHandler
