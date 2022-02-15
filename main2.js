// Created a 2nd js file, to better write my previous code witin the main.js file
const notePad = document.querySelector('#notePad');
const inputBtnContainer = document.querySelector('#inputBtnContainer');
const noInput = document.querySelector('.noInput');
const noteListContainer = document.querySelector('#noteListContainer');
const noteList = document.querySelector('.noteList');

function attachListItemBtn() {
  let createDiv = document.createElement('div');
  createDiv.className = 'btnDiv';
  createDiv.innerHTML = `
    <button class='delete'>Delete</button>
    <button class='edit'>Edit</button>
  `;
  return createDiv;
}

function createStorage(li) {
  const storageObj = {key: li.className, value: li}
  localStorage.setItem(JSON.stringify(storageObj.key), JSON.stringify(storageObj.value))
}

function createNote(noteInfo) {
  let createLi = document.createElement('li');
  createLi.innerHTML = `
    <span>${noteInfo}</span>
  `;
  createStorage(noteInfo);
  createLi.appendChild(attachListItemBtn());
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
  if (e.target.tagName == 'BUTTON') {
    if (e.target.className == 'delete') {
      let li = e.target.parentNode;
      let liClass = li.className;
      let ul = li.parentNode;
      ul.removeChild(li);
      localStorage.removeItem(liClass);
      if (noteList.innerHTML === '') {
        noInput.style.display = 'block';
      }
    }
  } if (e.target.className == 'edit') {

    // let li = e.target.parentNode;
    // let liClass = li.className;
    // let ul = li.parentNode;
    // ul.removeChild(li);
    // localStorage.removeItem(liClass);
    // notePad.value = li.textContent.replace('DeleteEdit', '');
    // if (noteList.innerHTML === '') {
    //   noInput.style.display = 'block';
    // }
  }

  if (e.target.tagName == 'LI' && e.target.style.overflow == 'hidden') {
    let liTarget = e.target;
    liTarget.style.overflow = '';
    liTarget.style.height = 'auto';
  } else {
    let liTarget = e.target
    liTarget.style.overflow = 'hidden';
    liTarget.style.height = '15vh';
  }

})