/*
const section_create = document.getElementById("section_create")
const section_read = document.getElementById("section_read")
const section_update = document.getElementById("section_update")
const section_delete = document.getElementById("section_delete")
*/

//TODO: refactor into reusable function
const sectionElements = (() => {
  const sectionElementsAll = Array.from(document.querySelectorAll(".admin-ui_section_action"));
  const adminUiSectionElements = sectionElementsAll.filter(elem => elem.id.match(/^admin-ui_section-[a-z]+$/))
  const sectionElements = {};
  adminUiSectionElements.forEach(elem => {
    const id = elem.id.split("_").pop();
    const splitId = id.split("-").pop();
    sectionElements[splitId] =  elem;
  })
  return sectionElements
})()

const navbarElements = (() => {
  const navElementsAll = Array.from(document.querySelectorAll("nav"));
  const adminUiNavElements = navElementsAll.filter(elem => elem.id.match(/^admin-ui_navbar-[a-z]+$/))
  const navbarElements = {};
  adminUiNavElements.forEach(elem => {
    const id = elem.id.split("_").pop();
    const splitId = id.split("-").pop();
    navbarElements[splitId] =  elem;
  })
  return navbarElements
})()


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