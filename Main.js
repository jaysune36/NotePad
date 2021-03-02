
let noteSave = document.getElementById("noteSave");

noteSave.addEventListener("click", function() {

  let notePad = document.getElementById("notePad");
  let notePadValue = document.getElementById("notePad").value;
  let createList = document.createElement("li");
  let noteList = document.getElementById("noteList");
  let getNoteList = notePadValue + " [" + new Date() + "]";

    noteList.insertAdjacentElement('afterbegin', createList);
    createList.id = "noteListItem";
    createList.className = getNoteList;
    createList.innerHTML = notePadValue;
    notePad.value = "";
 
})