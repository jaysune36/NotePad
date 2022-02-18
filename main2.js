// Created a 2nd js file, to better write my previous code witin the main.js file
const notePad = document.querySelector('#notePad');
const inputBtnContainer = document.querySelector('#inputBtnContainer');
const noInput = document.querySelector('.noInput');
const noteListContainer = document.querySelector('#noteListContainer');
const noteList = document.querySelector('.noteList');
const setValue = {value: []};
let storageValue = localStorage.getItem('noteList');
const saveCancel = ['save', 'cancel', 'Save', 'Cancel'];
const editDelete = ['delete', 'edit', 'Delete', 'Edit'];
// let storagesJSON = JSON.parse(storageValue).value;
let savedNotePad = null;
let indexValue;
let storagesIndex;


function attachListItemBtn(arrayType) {
  let createDiv = document.createElement('div');
  createDiv.className = 'btnDiv';
  createDiv.innerHTML = `
    <button class='${arrayType[0]}'>${arrayType[2]}</button>
    <button class='${arrayType[1]}'>${arrayType[3]}</button>
  `;
  return createDiv;
}

function createStorage(notesArray) {
  localStorage.setItem('noteList', JSON.stringify(notesArray))
}

function createNote(noteInfo) {
  let createLi = document.createElement('li');
  createLi.innerHTML = `
    <span>${noteInfo}</span>
  `;
  setValue.value.push(noteInfo);
  createStorage(setValue);
  createLi.appendChild(attachListItemBtn(editDelete));
  noteList.insertAdjacentElement('afterbegin', createLi);
}

function insertNewNote(elementAttach, elementAdd, btnCreate, removeOne, removeTwo) {
  elementAttach.insertAdjacentElement('afterbegin',elementAdd);
  elementAttach.appendChild(attachListItemBtn(btnCreate));
  elementAttach.removeChild(removeOne);
  elementAttach.removeChild(removeTwo);
}

function getStorage() {
  let storagesJSON = JSON.parse(storageValue).value;
  for(let i = 0; i<storagesJSON.length; i++) {
    let storageJSON = storagesJSON[i];
    createNote(storageJSON);
    if (localStorage) {
      noInput.style.display = 'none';
    }
  }
}

window.addEventListener('load', () => {
  getStorage();
})

inputBtnContainer.addEventListener('click', (e) => {
  if (e.target.tagName == 'BUTTON') {
    if (e.target.className == 'noteSave') {
      if (notePad.value) {
        noInput.style.display = 'none';
        createNote(notePad.value);
        notePad.value = null;
      }
    }

    if (e.target.className == 'clearInput') {
      notePad.value = '';
    }

    if (e.target.className == 'deleteAllInputs') {
      noteList.innerHTML = '';
      noInput.style.display = 'block';
      localStorage.clear();
    }
  }
})

noteList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const closestLi = e.target.closest('LI');
    if (e.target.className === 'delete') {
      let li = e.target.parentNode;
      let liClass = li.className;
      let ul = li.parentNode;
      closestLi.remove();
      localStorage.removeItem(liClass);
      if (noteList.innerHTML === '') {
        noInput.style.display = 'block';
      }
    }
    if(e.target.className === 'edit') {
      let noteSpan = closestLi.querySelector('span');
      let createInput = document.createElement('input');
      const btnDiv = closestLi.querySelector('.btnDiv');
      savedNotePad = noteSpan.innerText;


      indexValue = setValue.value.indexOf(savedNotePad);
      // storagesIndex = JSON.parse(localStorage.getItem('noteList')).value
      console.log(indexValue);
      console.log(setValue.value.indexOf(savedNotePad));
      // console.log(storagesIndex)
      // storagesJSON.splice(storagesIndex, 1);
      // setValue.value.splice(storagesIndex, 1);


      createInput.setAttribute('type', 'text');
      createInput.value = noteSpan.innerText;
      insertNewNote(closestLi, createInput, saveCancel, noteSpan, btnDiv);
    }
    if(e.target.className === 'save') {
      let input = closestLi.querySelector('input');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let createSpan = document.createElement('span');
      createSpan.innerText = document.querySelector('input').value;


      setValue.value.splice(indexValue, 1);
      setValue.value.splice(indexValue, 0, createSpan.innerText);
      createStorage(setValue)
      console.log(setValue.value.splice(indexValue, 0, createSpan.innerText));
      // console.log(storagesIndex);
      // storagesJSON.splice(storagesIndex, 0, createSpan.innerText);
      // setValue.value.splice(storagesIndex, 0, createSpan.innerText);
      // console.log(storagesJSON)
      // console.log(setValue.value);

      insertNewNote(closestLi, createSpan, editDelete, input, btnDiv);
    }
    if(e.target.className === 'cancel') {
      let input = closestLi.querySelector('input');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let createSpan = document.createElement('span');
      createSpan.innerText = savedNotePad;
      insertNewNote(closestLi, createSpan, editDelete, input, btnDiv);
    }
  }

})