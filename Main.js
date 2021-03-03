
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
  createList.appendChild(divCreate);
  divCreate.id = 'btnContainter';
  divCreate.insertAdjacentElement('afterbegin', deleteButtonCreate);
  divCreate.insertAdjacentElement('afterbegin', editButtonCreate);
  deleteButtonCreate.id = "deleteButton";
  editButtonCreate.id = "editButton";
  deleteButtonCreate.className = getNoteList;
  editButtonCreate.className = getNoteList;
  deleteButtonCreate.innerHTML = "Delete";
  editButtonCreate.innerHTML = "Edit"
  notePad.value = "";

  const btnContainter = document.getElementById('btnContainter');

  btnContainter.addEventListener("click", (e) => {
    const isDeleteBtn = e.target.id === 'deleteButton';
    const isEditBtn = e.target.id === 'editButton';
    let getDeleteBtn = document.getElementById('deleteButton');
    let getNoteItem = getDeleteBtn.closest('#noteListItem');
    let getNoteClassName = getNoteItem.className;
    let matchingNote = e.target.className === getNoteClassName

    if(isDeleteBtn && matchingNote) {
      console.log('deleted');
      
    } 

    if(isEditBtn && matchingNote) {
      console.log('edited')
    }
  })

})

