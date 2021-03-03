
let noteSave = document.getElementById("noteSave");
let deleteButtonCreate = document.createElement("button");
let editButtonCreate = document.createElement("button");
let divCreate = document.createElement("div");
let buttonSelector = document.querySelector("button");


noteSave.addEventListener("click", function () {

  let notePad = document.getElementById("notePad");
  let notePadValue = document.getElementById("notePad").value;
  let createList = document.createElement("li");
  let noteList = document.getElementById("noteList");
  const getNoteList = notePadValue + " [" + new Date() + "]";

  noteList.insertAdjacentElement('afterbegin', createList);
  createList.id = "noteListItem";
  createList.className = getNoteList;
  createList.innerHTML = notePadValue;
  createList.insertAdjacentElement('afterend', divCreate);
  divCreate.id = 'btnContainter';
  divCreate.insertAdjacentElement('afterbegin', deleteButtonCreate);
  divCreate.insertAdjacentElement('afterbegin', editButtonCreate);
  deleteButtonCreate.className = "deleteButton";
  editButtonCreate.className = "editButton";
  deleteButtonCreate.innerHTML = "Delete";
  editButtonCreate.innerHTML = "Edit"
  notePad.value = "";

  const btnContainter = document.getElementById('btnContainter')

  btnContainter.addEventListener("click", (e) => {
    const isBtn = e.target.nodeName === 'BUTTON';
    const deleteBtn = document.getElementsByClassName('deleteButton');
    const editBtn = document.getElementsByClassName('editButton');

    if(!isBtn) {
      return 
    } else if(deleteBtn == 'click') {

      console.log("deleted");
    } else if(editBtn == 'click') {
      console.log("edit")
    }

    console.dir(e.target.className)

  })

})

