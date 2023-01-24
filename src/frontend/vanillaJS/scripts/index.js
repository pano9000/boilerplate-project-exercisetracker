const eventHandlers = require("./eventHandlers/");
const {
  navbarElements,
  formElements,
  sectionElements
} = require("./elements")



Object.keys(navbarElements).forEach( key => {
  console.log("NavElem", key ,navbarElements[key])
  navbarElements[key].addEventListener("click", eventHandlers.navbarMainClickHandler);
});

Object.keys(formElements).forEach( key => {
  console.log("FormELem:", key ,formElements[key])
  formElements[key].addEventListener("submit", eventHandlers.submitFormHandler);
});
