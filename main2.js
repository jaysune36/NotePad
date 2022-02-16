// Created a 2nd js file, to better write my previous code witin the main.js file
const notePad = document.querySelector('#notePad');
const inputBtnContainer = document.querySelector('#inputBtnContainer');
const noInput = document.querySelector('.noInput');
const noteListContainer = document.querySelector('#noteListContainer');
const noteList = document.querySelector('.noteList');
const setValue = {value: []};
let savedNotePad;

function attachListItemBtn(classOne, classTwo, textOne, textTwo) {
  let createDiv = document.createElement('div');
  createDiv.className = 'btnDiv';
  createDiv.innerHTML = `
    <button class='${classOne}'>${textOne}</button>
    <button class='${classTwo}'>${textTwo}</button>
  `;
  return createDiv;
}

function createStorage(li) {
  setValue.value.push(li);
  console.log(setValue.value);
  localStorage.setItem('noteList', JSON.stringify(setValue))
}

//Test Storage

// let testOne = localStorage.getItem('noteList');
// console.log(JSON.parse(testOne).value)

function createNote(noteInfo) {
  let createLi = document.createElement('li');
  createLi.innerHTML = `
    <span>${noteInfo}</span>
  `;
  createStorage(noteInfo);
  createLi.appendChild(attachListItemBtn('delete', 'edit', 'Delete', 'Edit'));
  noteList.insertAdjacentElement('afterbegin', createLi);
}

function getStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const getKey = localStorage.key(i);
    const getItem = localStorage.getItem(getKey);
    let newListItem = document.createElement('li');
    newListItem.className = getKey;
    newListItem.textContent = getItem;
    attachListItemBtn(newListItem);
    noteList.appendChild(newListItem);
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
      console.log(savedNotePad);
      createInput.setAttribute('type', 'text');
      createInput.value = noteSpan.innerText;
      closestLi.insertAdjacentElement('afterbegin',createInput);
      closestLi.appendChild(attachListItemBtn('save', 'cancel', 'Save', 'Cancel'));
      closestLi.removeChild(noteSpan);
      closestLi.removeChild(btnDiv);
    }
    if(e.target.className === 'save') {
      let input = closestLi.querySelector('input');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let createSpan = document.createElement('span');
      createSpan.innerText = document.querySelector('input').value;
      closestLi.insertAdjacentElement('afterbegin', createSpan);
      closestLi.appendChild(attachListItemBtn('delete', 'edit', 'Delete', 'Edit'));
      closestLi.removeChild(input);
      closestLi.removeChild(btnDiv);
    }
    if(e.target.className === 'cancel') {
      let input = closestLi.querySelector('input');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let createSpan = document.createElement('span');
      console.log(savedNotePad);
      createSpan.innerText = savedNotePad;
      closestLi.insertAdjacentElement('afterbegin', createSpan);
      closestLi.appendChild(attachListItemBtn('delete', 'edit', 'Delete', 'Edit'));
      closestLi.removeChild(input);
      closestLi.removeChild(btnDiv);
    }
  }

})