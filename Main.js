
let noteSave = document.getElementById("noteSave");
let newDeleteBtn = document.createElement("button");
let newEditBtn = document.createElement("button");
let newDiv = document.createElement("div");
let buttonSelector = document.querySelector("button");
let clearInput = document.getElementById("clearInput");
let notePad = document.getElementById("notePad");


noteSave.addEventListener("click", function () {

  let notePadValue = notePad.value;
  const getNoteList = notePadValue + " [" + new Date() + "]";
  let noteList = document.getElementById("noteList");
  let notelistChild = noteList.firstElementChild;
  let noteListContainer = document.getElementById("noteListContainer")
  let newLi = document.createElement("li");

  if(notePadValue === "") {
    return null;
    }

  noteList.appendChild(newLi)
  newLi.id = "noteListItem";
  newLi.className = getNoteList;
  newLi.innerHTML = notePadValue;
  newLi.insertAdjacentElement('afterend', newDiv);
  newDiv.id = 'btnContainter';
  newDiv.insertAdjacentElement('afterbegin', newDeleteBtn);
  newDiv.insertAdjacentElement('afterbegin', newEditBtn);
  newDeleteBtn.id = "deleteButton";
  newEditBtn.id = "editButton";
  newDeleteBtn.className = getNoteList;
  newEditBtn.className = getNoteList;
  newDeleteBtn.innerHTML = "Delete";
  newEditBtn.innerHTML = "Edit";
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

clearInput.addEventListener("click", function() {
  notePad.value = "";
})