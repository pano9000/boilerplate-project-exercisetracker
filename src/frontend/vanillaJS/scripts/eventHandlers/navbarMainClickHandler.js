const { sectionElements } = require("../elements")
const classBtnNavActive = "btn-nav_active";


function navbarMainClickHandler(event) {

  const currentActiveElem = event.target;
  console.log(currentActiveElem)
  if (currentActiveElem.matches(".btn-nav")) {

    const previousActiveElem = getPreviousActiveElem(event.target.parentElement)

    const currentSection = currentActiveElem.id.split("_").pop();
    const previousSection = previousActiveElem.id.split("_").pop();

    previousActiveElem.classList.remove(classBtnNavActive)
    currentActiveElem.classList.add(classBtnNavActive)

    sectionElements[previousSection].classList.remove("admin-ui_section_action_active");
    sectionElements[currentSection].classList.add("admin-ui_section_action_active");

  }

}

function getPreviousActiveElem(parentElement) {
  const children = Array.from(parentElement.children)
  const filteredChildren = children.filter(element => element.classList.contains(classBtnNavActive))
  return filteredChildren[0]
}

module.exports = navbarMainClickHandler