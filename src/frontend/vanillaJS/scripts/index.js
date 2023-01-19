const navbarElements = getElementsList("nav", /^admin-ui_navbar-[a-z]+$/);
const sectionElements = getElementsList(".admin-ui_section_action", /^admin-ui_section-[a-z]+$/);


const classBtnNavActive = "btn-nav_active";
//const classBtnNav = "btn-nav"

Object.keys(navbarElements).forEach( key => {
  navbarElements[key].addEventListener("click", navbarMainClickHandler);
});

function navbarMainClickHandler(event) {
  const currentActiveElem = event.target
  if (currentActiveElem.matches(".btn-nav")) {

    const previousActiveElem = getPreviousActiveElem(event.target.parentElement)

    const currentSection = currentActiveElem.id.split("_").pop();
    const previousSection = previousActiveElem.id.split("_").pop();
    console.log([currentSection, previousSection])
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


function getElementsList(querySelector, idRegex) {
  const elementsAll = Array.from(document.querySelectorAll(querySelector));
  const adminUiElements = elementsAll.filter(elem => elem.id.match(idRegex));
  const selectedElements = {};
  adminUiElements.forEach(elem => {
    const id = elem.id.split("_").pop();
    const key = id.split("-").pop();
    selectedElements[key] =  elem;
  })

  return selectedElements
}