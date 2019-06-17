function createTable(arr, headers, description) {
  if(arr.constructor !== Array) return;
  if(arr.length === 0) return;
  let innerObject = Object.keys(arr[0]);
  let isString = false;
  if(typeof arr[0] === "string") {
    isString = true;
  }
  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  if(description) {
    let caption = document.createElement("caption");
    let text = document.createTextNode(description);
    caption.appendChild(text);
    table.appendChild(caption);
    table.appendChild(tableHead);
  }
  else {
    table.appendChild(tableHead);
  }
  if(!headers) {
    let tr = document.createElement("tr");
    for(let i = 0; i < innerObject.length; i++) {
      let th = document.createElement("th");
      let capitalize = innerObject[i].charAt(0).toUpperCase() + innerObject[i].slice(1);
      let text = document.createTextNode(capitalize);
      th.appendChild(text);
      tr.appendChild(th);
    }
    tableHead.appendChild(tr);
  }
  else {
    let tr = document.createElement("tr");
    let th = document.createElement("th");
    let text = document.createTextNode(headers);
    th.appendChild(text);
    tr.appendChild(th);
    tableHead.appendChild(tr);
  }
  let tableBody = document.createElement("tbody");
  table.appendChild(tableBody);
  if(isString) {
    for(let i = 0; i < arr.length; i++) {
      let tr = document.createElement("tr");
      let td = document.createElement("td");
      let text = document.createTextNode(arr[i]);
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    }
  }
  else {
    for(let i = 0; i < arr.length; i++) {
      let tr = document.createElement("tr");
      Object.keys(arr[i]).forEach(key => {
        let td = document.createElement("td");
        let text = document.createTextNode(arr[i][key]);
        td.appendChild(text);
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    }
  }
  isString = false;
  document.body.appendChild(table);
}
export {createTable};