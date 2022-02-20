// Created a 2nd js file, to better write my previous code witin the main.js file
document.addEventListener('DOMContentLoaded', ()=> {
  const notePad = document.querySelector('#notePad');
  const inputBtnContainer = document.querySelector('#inputBtnContainer');
  const noInput = document.querySelector('.noInput');
  const noteListContainer = document.querySelector('#noteListContainer');
  const noteList = document.querySelector('.noteList');
  const pages = document.querySelector('.pages')
  const saveCancel = ['save', 'cancel', 'Save', 'Cancel'];
  const editDelete = ['delete', 'edit', 'Delete', 'Edit'];
  const setValue = {value: []};
  let storageValue = localStorage.getItem('noteList');
  let pagesCount = 1;
  let notesCount = 0;
  let savedNotePad = null;
  let indexValue;

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
    let createAnc = document.createElement('a');
    createLi.setAttribute('data-index', notesCount);
    createLi.setAttribute('data-set', pagesCount);
    createLi.innerHTML = `<span>${noteInfo}</span>`;
    setValue.value.unshift(noteInfo);
    createStorage(setValue);
    createLi.appendChild(attachListItemBtn(editDelete));
    noteList.insertAdjacentElement('afterbegin', createLi);
    if(createLi.getAttribute('data-index') < 5) {
      notesCount++
    } else {
      for(let i = 0; i < noteList.getElementsByTagName('li').length; i++) {
        let notes = noteList.getElementsByTagName('li')[i];
        notes.style.display = 'none';
        console.log(notes)
        if(i === 5) {
          break;
        }
      }
      notesCount = 0;
      pagesCount ++;
      createAnc.innerText = pagesCount;
      createAnc.setAttribute('href', '#');
      pages.appendChild(createAnc);
    }
  }

  function insertNote(elementAttach, elementAdd, btnCreate, removeOne, removeTwo) {
    elementAttach.insertAdjacentElement('afterbegin',elementAdd);
    elementAttach.appendChild(attachListItemBtn(btnCreate));
    elementAttach.removeChild(removeOne);
    elementAttach.removeChild(removeTwo);
  }

  function findRemoveItem(emptyVarOne, emptyVarTwo, element, array) {
    emptyVarOne = element.innerText;
    emptyVarTwo = array.value.indexOf(emptyVarOne);
    array.value.splice(emptyVarTwo, 1);
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
          createNote(notePad.value);
          noInput.style.display = 'none';
          pages.style.display = 'block';
          notePad.value = null;
        }
      }

      if (e.target.className == 'clearInput') {
        notePad.value = '';
      }

      if (e.target.className == 'deleteAllInputs') {
        noteList.innerHTML = '';
        noInput.style.display = 'block';
        pages.style.display = 'none';
        setValue.value.splice(0, setValue.value.length);
        pagesCount = 1;
        notesCount = 0;
        localStorage.clear();
      }
    }
  })

  noteList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const closestLi = e.target.closest('LI');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let input = closestLi.querySelector('input');
      let createSpan = document.createElement('span');
      let noteSpan = closestLi.querySelector('span');
      if (e.target.className === 'delete') {
        let li = e.target.parentNode;
        let liClass = li.className;
        findRemoveItem(savedNotePad, indexValue, noteSpan, setValue);
        createStorage(setValue);
        closestLi.remove();
        localStorage.removeItem(liClass);
        if (noteList.innerHTML === '') {
          noInput.style.display = 'block';
        }
      }
      if(e.target.className === 'edit') {
        let createInput = document.createElement('input');
        createInput.setAttribute('type', 'text');
        createInput.value = noteSpan.innerText;
        findRemoveItem(savedNotePad, indexValue, noteSpan, setValue);
        insertNote(closestLi, createInput, saveCancel, noteSpan, btnDiv);
      }
      if(e.target.className === 'save') {
        createSpan.innerText = document.querySelector('input').value;
        setValue.value.splice(indexValue, 0, createSpan.innerText);
        createStorage(setValue)
        insertNote(closestLi, createSpan, editDelete, input, btnDiv);
      }
      if(e.target.className === 'cancel') {
        createSpan.innerText = savedNotePad;
        insertNote(closestLi, createSpan, editDelete, input, btnDiv);
      }
    }

  })

  pages.addEventListener('click', (e)=> {
    if(e.target.closest('div').className === 'pages') {
      const notes = noteList.getElementsByTagName('li');
      if(e.target.tagName === 'A') {
        let pageSelect = e.target.innerText;
        for (let i=0; i<notes.length; i++) {
          let note = notes[i];
          let dataPage = note.getAttribute('data-set');
          console.log(note.getAttribute('data-set'))
          if(dataPage === pageSelect) {
            note.style.display = 'block';
          } else {
            note.style.display = 'none';
          }
        }
        console.log(notes)
        // for(let i=0; i < notes.getAttribute('data-set').length; i++) {
        //   let note = notes[i];
        //   // notes.style.display = 'block';
        //   console.log(note);
        // }
      }
    }
  })
})