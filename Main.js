
let noteSave = document.getElementById("noteSave");
let buttonSelector = document.querySelector("button");
let clearInput = document.getElementById("clearInput");
let notePad = document.getElementById("notePad");
let getDeleteAll = document.getElementById("deleteAllInputs");
let noInput = document.getElementById('noInput');


noteSave.addEventListener("click", function () {

  let notePadValue = notePad.value;
  const getNoteList = notePadValue + " [" + new Date() + "]";
  let noteList = document.getElementById("noteList");
  let newLi = document.createElement("li");
  let newDeleteBtn = document.createElement("button");
  let newEditBtn = document.createElement("button");
  let newDiv = document.createElement("div");
  newDeleteBtn.id = "deleteButton";
  newEditBtn.id = "editButton";

  if(notePadValue === "") {
    return null;
    }

  noInput.style.visibility = 'hidden';
  noteList.insertAdjacentElement('afterbegin', newLi);
  newLi.id = "noteListItem";
  newLi.className = getNoteList;
  newLi.innerHTML = notePadValue;
  newLi.insertAdjacentElement('beforeend', newDiv);
  newDiv.id = 'itemBtnContainter';
  newDiv.insertAdjacentElement('afterbegin', newDeleteBtn);
  newDiv.insertAdjacentElement('afterbegin', newEditBtn);
  newDeleteBtn.className = getNoteList;
  newEditBtn.className = getNoteList;
  newDeleteBtn.innerHTML = "Delete";
  newEditBtn.innerHTML = "Edit";
  notePad.value = "";

  const itemBtnContainer = document.getElementById('itemBtnContainter');

  itemBtnContainer.addEventListener("click", (e) => {
    const isDeleteBtn = e.target.id === 'deleteButton';
    const isEditBtn = e.target.id === 'editButton';
    let target = e.target.parentElement;
    let targetLi = target.closest("li")
    //let getNoteClassName = getNoteItem.className;
    //let matchingNote = e.target.className === getNoteClassName;

    if(isDeleteBtn && targetLi.className === e.target.className) {
      //console.log('deleted');
      //console.dir(targetLi.className)
      targetLi.remove()
      
      //trying to create function that will check if noteList is empty
      //and if noteList is empty to display noInput Text
      if(noteList.innerHTML === '') {
        noInput.style.visibility = 'visible';
      } 
      
    } 

    if(isEditBtn) {
      //console.log('edited');
      
      if(targetLi.className === e.target.className) {
        targetLi.removeChild(itemBtnContainer);
        targetLi.remove();
        notePad.value = targetLi.innerText; 
        //let inputBtnNameRemove = getEditDeleteName.replace('Edit', '');
        //let removeContainer = targetLi.nextElementSibiling;
        //console.log(targetLi.innerText);
        //console.dir(getEditDeleteName);

        if(noteList.innerHTML === '') {
          noInput.style.visibility = 'visible';
        }

      }
      
    }
  })

})

clearInput.addEventListener("click", function() {
  notePad.value = "";
})

getDeleteAll.addEventListener('click', function() {
  
  noteList.innerHTML = '';
  noInput.style.visibility = 'visible';

})