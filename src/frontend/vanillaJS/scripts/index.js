/*
const section_create = document.getElementById("section_create")
const section_read = document.getElementById("section_read")
const section_update = document.getElementById("section_update")
const section_delete = document.getElementById("section_delete")
*/

//TODO: make this dynamic
const sectionElements = {
  create: document.getElementById("section_create"),
  read: document.getElementById("section_read"),
  update: document.getElementById("section_update"),
  delete: document.getElementById("section_delete"),
  createuser: document.getElementById("section_createuser"),
  createexercise: document.getElementById("section_createexercise"),
  readallusers: document.getElementById("section_readallusers"),
  readoneuser: document.getElementById("section_readoneuser"),
  readuserexercise: document.getElementById("section_readuserexercise"),
}

const navbarElements = {
  main: document.getElementById("navbar-main"),
  create: document.getElementById("navbar-create"),
  read: document.getElementById("navbar-read"),
  update: document.getElementById("navbar-update"),
  delete: document.getElementById("navbar-delete")
}

//const navbarMain = document.getElementById("navbar-main")

const classBtnNavActive = "btn-nav_active";
//const classBtnNav = "btn-nav"

navbarElements.main.addEventListener("click", navbarMainClickHandler)
navbarElements.create.addEventListener("click", navbarMainClickHandler)
navbarElements.read.addEventListener("click", navbarMainClickHandler)

function navbarMainClickHandler(event) {
  const currentActiveElem = event.target
  if (currentActiveElem.matches(".btn-nav")) {

    const previousActiveElem = getPreviousActiveElem(event.target.parentElement)

    const currentSection = currentActiveElem.id.split("_").pop();
    const previousSection = previousActiveElem.id.split("_").pop();
    console.log([currentSection, previousSection])
    previousActiveElem.classList.remove(classBtnNavActive)
    currentActiveElem.classList.add(classBtnNavActive)
    
    sectionElements[previousSection].classList.remove("section_action_active");
    sectionElements[currentSection].classList.add("section_action_active");

  }

}


function getPreviousActiveElem(parentElement) {
  const children = Array.from(parentElement.children)
  const filteredChildren = children.filter(element => element.classList.contains(classBtnNavActive))
  return filteredChildren[0]
}