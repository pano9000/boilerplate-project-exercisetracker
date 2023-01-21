const eventHandlers = require("./eventHandlers/");
const {
  navbarElements,
  formElements,
  sectionElements
} = require("./elements")



Object.keys(navbarElements).forEach( key => {
  console.log(key ,navbarElements[key])
  navbarElements[key].addEventListener("click", eventHandlers.navbarMainClickHandler);
});

formElements.createuser.addEventListener("submit", eventHandlers.createUserFormHandler)
formElements.createexercise.addEventListener("submit", eventHandlers.createExerciseFormHandler)
formElements.deleteuser.addEventListener("submit", eventHandlers.deleteUserFormHandler)