// Created a 2nd js file, to better write my previous code witin the main.js file
const notePad = document.querySelector('#notePad');
const inputBtnContainer = document.querySelector('#inputBtnContainer');
const noInput = document.querySelector('#noInput');
const noteListContainer = document.querySelector('#noteContainer');
const noteList = document.querySelector('#noteList');

function attachListItemBtn(li) {
  let deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete'
  deleteBtn.textContent = 'Delete';
  li.appendChild(deleteBtn)
  let editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.textContent = 'Edit';
  li.appendChild(editBtn);
}

function createList(li) {
  let newItem = document.createElement('li');
  newItem.textContent = li;
  attachListItemBtn(newItem);
  noteList.appendChild(newItem);
}

function setStorage(li) {
  localStorage.setItem(Date.now(), li)
}

function getStorage() {
  for(let i = 0; i < localStorage.length; i++) {
    let getKey = localStorage.key(i);
    let getItem = localStorage.getItem(getKey);
    createList(getItem);
    if(localStorage) {
      noInput.style.display = 'none';
    }
  }
}

window.addEventListener('load', () => {
  getStorage();
})

inputBtnContainer.addEventListener('click', (e) => {
  if(e.target.tagName == 'BUTTON'){
    if(e.target.id == 'noteSave') {
        if(notePad.value) {
          noInput.style.display = 'none';
          createList(notePad.value);
          setStorage(notePad.value);
        }
    }

    if(e.target.id == 'clearInput') {
      notePad.value = '';
    }

    if(e.target.id == 'deleteAllInputs') {
      noteList.innerHTML = '';
      noInput.style.display = 'block';
      localStorage.clear();
    }
  }
})

noteList.addEventListener('click', (e) => {
  if(e.target.tagName == 'BUTTON') {
    if(e.target.className == 'delete') {
      let li = e.target.parentNode;
      let ul = li.parentNode;
      ul.removeChild(li);
      if(noteList.innerHTML === '') {
        noInput.style.display = 'block';
      }
    }
  } if(e.target.className == 'edit') {
    let li = e.target.parentNode;
    let ul = li.parentNode;
    ul.removeChild(li);
    notePad.value = li.textContent.replace('DeleteEdit', '');
    if(noteList.innerHTML === '') {
      noInput.style.display = 'block';
    }
  }
})