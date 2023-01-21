const { getElementsList } = require("./utils")

const navbarElements = getElementsList("nav", /^admin-ui_navbar-[a-z]+$/);
const sectionElements = getElementsList(".admin-ui_section_action", /^admin-ui_section-[a-z]+$/);
const formElements = getElementsList(".admin-ui_form", /^admin-ui_form-[a-z]+$/);

module.exports = {
  navbarElements,
  sectionElements,
  formElements
}