

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

module.exports = getElementsList