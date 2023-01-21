function showMessage(parentElement, message, status) {

  const element = document.createElement("div");

  element.innerText = message;
  element.classList.add("message", (status === "ok") ? "message_ok" : "message_error");

  /*
  if (status === "ok") {
    element.classList.replace("message_error", "message_ok")
  } else {
    element.classList.replace("message_ok", "message_error")
  }
*/
  element.style.opacity = 1;
  parentElement.append(element)
  // harder to read than the if/else above?
  //const statusOK = (status === "ok");
  //element.classList.replace(((statusOK) ? "message_error" : "message_ok" ), ((statusOK) ? "message_ok" : "message_error" ))

}

module.exports = showMessage