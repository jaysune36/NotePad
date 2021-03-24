fetch("text.json");

let noteSave = document.getElementById("noteSave");
let buttonSelector = document.querySelector("button");
let clearInput = document.getElementById("clearInput");
let notePad = document.getElementById("notePad");
let getDeleteAll = document.getElementById("deleteAllInputs");
let noInput = document.getElementById('noInput');
let noteList = document.getElementById("noteList");
let itemContainer = document.getElementById("itemContainer")

window.addEventListener("load", function () {

  for (let i = 0; i < localStorage.length; i++) {

    if (localStorage) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);


      noInput.style.visibility = "hidden";
      
      const lsNoteList = key;
      let newLi = document.createElement("li");
      let newDeleteBtn = document.createElement("button");
      let newEditBtn = document.createElement("button");
      let newDiv = document.createElement("div");
      newDeleteBtn.id = "deleteButton";
      newEditBtn.id = "editButton";

      console.log(value);

      noteList.insertAdjacentElement("beforeend", newLi);
      newLi.innerText = localStorage.getItem(key);
      newLi.id = "noteListItem";
      newLi.className = lsNoteList;

      newLi.insertAdjacentElement('beforeend', newDiv);
      newDiv.id = 'itemBtnContainter';
      newDiv.insertAdjacentElement('afterbegin', newDeleteBtn);
      newDiv.insertAdjacentElement('afterbegin', newEditBtn);
      newDeleteBtn.className = key;
      newEditBtn.className = key;
      newDeleteBtn.innerHTML = "Delete";
      newEditBtn.innerHTML = "Edit";
      notePad.value = "";
    } else {
      noInput.style.visibility = "visible"
    };
  };


  noteSave.addEventListener("click", function () {

    let notePadValue = notePad.value;
    const setNoteList = notePadValue + " [" + Date.now() + "]";
    let newLi = document.createElement("li");
    let newDeleteBtn = document.createElement("button");
    let newEditBtn = document.createElement("button");
    let newDiv = document.createElement("div");
    newDeleteBtn.id = "deleteButton";
    newEditBtn.id = "editButton";

    if (notePadValue === "") {
      return null;
    };


    noInput.style.visibility = 'hidden';
    noteList.insertAdjacentElement('afterbegin', newLi);
    localStorage.setItem(setNoteList, notePad.value);
    newLi.id = "noteListItem";
    newLi.className = setNoteList;
    newLi.innerHTML = notePadValue;
    newLi.insertAdjacentElement('beforeend', newDiv);
    newDiv.id = 'itemBtnContainter';
    newDiv.insertAdjacentElement('afterbegin', newDeleteBtn);
    newDiv.insertAdjacentElement('afterbegin', newEditBtn);
    newDeleteBtn.className = setNoteList;
    newEditBtn.className = setNoteList;
    newDeleteBtn.innerHTML = "Delete";
    newEditBtn.innerHTML = "Edit";
    notePad.value = "";

    const itemBtnContainer = document.getElementById('itemBtnContainter');

    itemBtnContainer.addEventListener("click", (e) => {
     // const isDeleteBtn = e.target.id === 'deleteButton';
      const isEditBtn = e.target.id === 'editButton';
      let target = e.target.parentElement;
      let targetLi = target.closest("li");

     // if (isDeleteBtn && targetLi.className === e.target.className) {
      //  targetLi.remove();
      //  localStorage.removeItem(targetLi.className);

      //  if (noteList.innerHTML === '') {
      //    noInput.style.visibility = 'visible';
      //  }

     // }

      if (isEditBtn && targetLi.className === e.target.className) {

        targetLi.removeChild(itemBtnContainer);
        targetLi.remove(targetLi);
        notePad.value = targetLi.innerText;
        localStorage.setItem(setNoteList, notePad.value);
        localStorage.removeItem(targetLi.className);

        if (noteList.innerHTML === '') {
          noInput.style.visibility = 'visible';
        }


      }
    });

  });

});

itemContainer.addEventListener("click", (e) => {
  
      const isDeleteBtn = e.target.id === 'deleteButton';
      const isEditBtn = e.target.id === 'editButton';
      let target = e.target.parentElement;
      let targetLi = target.closest("li");

      if (isDeleteBtn && targetLi.className === e.target.className) {
        targetLi.remove();
        localStorage.removeItem(targetLi.className);

        if (noteList.innerHTML === '') {
          noInput.style.visibility = 'visible';
        }

      }

})

clearInput.addEventListener("click", function () {
  notePad.value = null;
});

getDeleteAll.addEventListener('click', function () {

  noteList.innerHTML = '';
  noInput.style.visibility = 'visible';
  localStorage.clear();
});