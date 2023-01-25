function showResult(element, data) {
  console.log("***elem showresult", element, data, Object.keys(data))
  element
  const lineWrapElems = Object.keys(data).map(key => {

    const lineWrapElem = document.createElement("div");
    const keyElem = document.createElement("span")
    const valueElem = document.createElement("span")

    keyElem.classList.add("admin-ui_result-label_key");
    valueElem.classList.add("admin-ui_result-label_value");
    lineWrapElem.classList.add("admin-ui_result_lineWrap")

    keyElem.innerText = key;
    valueElem.innerText = data[key];

    [keyElem, valueElem].forEach( elem => lineWrapElem.appendChild(elem))
    return lineWrapElem
  })
  
  const dataWrapElem = document.createElement("div");
  dataWrapElem.classList.add("admin-ui_result-dataWrap");
  [...lineWrapElems].forEach(lineWrapElem => dataWrapElem.appendChild(lineWrapElem) );
//  dataWrapElem.appendChild(...lineWrapElem);

element.replaceWith(dataWrapElem)
console.log("***lineee", lineWrapElems)
console.log("***dataWrapElem", dataWrapElem)
}

module.exports = showResult