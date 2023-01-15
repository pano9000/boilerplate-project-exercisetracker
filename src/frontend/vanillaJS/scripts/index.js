const section_create = document.getElementById("section_create")
const section_read = document.getElementById("section_read")
const section_update = document.getElementById("section_update")
const section_delete = document.getElementById("section_delete")
const navbar = document.getElementById("navbar")

const classBtnNav = {
  active: "btn_nav_active"
}

navbar.addEventListener("click", navBarClickHandler)


function navBarClickHandler(event) {
  const currentActiveElem = event.target
  if (currentActiveElem.matches(".btn_nav")) {
    const previousActiveElem = getPreviousActiveElem(event.target.parentElement)
    event.target.classList.add("btn_nav_active")
    console.log(event)
    previousActiveElem.classList.remove("btn_nav_active")
    currentActiveElem.classList.add("btn_nav_active")
  }

}


function getPreviousActiveElem(parentElement) {
  const children = Array.from(parentElement.children)
  const filteredChildren = children.filter(element => element.classList.contains("btn_nav_active"))
  return filteredChildren[0]
}