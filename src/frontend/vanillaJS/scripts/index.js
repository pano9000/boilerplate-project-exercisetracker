const section_create = document.getElementById("section_create")
const section_read = document.getElementById("section_read")
const section_update = document.getElementById("section_update")
const section_delete = document.getElementById("section_delete")

const sectionElements = {
  create: document.getElementById("section_create"),
  read: document.getElementById("section_read"),
  update: document.getElementById("section_update"),
  delete: document.getElementById("section_delete"),
}


const navbarMain = document.getElementById("navbar-main")

const classBtnNavActive = "btn-nav_active";
//const classBtnNav = "btn-nav"

navbarMain.addEventListener("click", navBarClickHandler)


function navBarClickHandler(event) {
  const currentActiveElem = event.target
  if (currentActiveElem.matches(".btn-nav")) {

    const previousActiveElem = getPreviousActiveElem(event.target.parentElement)
    previousActiveElem.classList.remove(classBtnNavActive)
    currentActiveElem.classList.add(classBtnNavActive)
    const currentSection = currentActiveElem.id.split("_").pop();
    const previousSection = previousActiveElem.id.split("_").pop();

    sectionElements[previousSection].classList.remove("section_action_active");
    sectionElements[currentSection].classList.add("section_action_active");

  }

}


function getPreviousActiveElem(parentElement) {
  const children = Array.from(parentElement.children)
  const filteredChildren = children.filter(element => element.classList.contains(classBtnNavActive))
  return filteredChildren[0]
}