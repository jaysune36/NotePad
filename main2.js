// Created a 2nd js file, to better write my previous code witin the main.js file
document.addEventListener('DOMContentLoaded', ()=> {
  const notePad = document.querySelector('#notePad');
  const inputBtnContainer = document.querySelector('#inputBtnContainer');
  const noInput = document.querySelector('.noInput');
  const noteListContainer = document.querySelector('#noteListContainer');
  const noteList = document.querySelector('.noteList');
  const pages = document.querySelector('.pages');
  const saveCancel = ['save', 'cancel', 'Save', 'Cancel'];
  const editDelete = ['delete', 'edit', 'Delete', 'Edit'];
  const setValue = {value: []};
  let storageValue = localStorage.getItem('noteList');
  let dataIndex = 0;
  let pagesCount = 1;
  let notesCount = 1;
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
    localStorage.setItem('noteList', JSON.stringify(notesArray));
  }

  function createNote(noteInfo) {
    let createLi = document.createElement('li');
    let createAnc = document.createElement('a');
    const firstChild = noteList.firstElementChild;
    createLi.setAttribute('data-index', dataIndex);
    createLi.setAttribute('data-set', pagesCount);
    createLi.innerHTML = `<span>${noteInfo}</span>`;
    setValue.value.unshift(noteInfo);
    createStorage(setValue);
    createLi.appendChild(attachListItemBtn(editDelete));
    noteList.insertAdjacentElement('afterbegin', createLi);
    dataIndex++;
    if(notesCount < 5) {
      notesCount++;
    } else {
      notesCount = 1;
      pagesCount ++;
    }
    // console.log(noteList.getElementsByTagName('li').firstElementChild);
    // console.log(firstChild.getAttribute('data-set') < createLi.getAttribute('data-set'));
    // console.log(noteList.lastElementChild.getAttribute('data-set') < createLi.getAttribute('data-set'))
    if(firstChild && firstChild.getAttribute('data-set') < createLi.getAttribute('data-set')) {
      console.log('the set changes')
      for(let i = 0; i < noteList.getElementsByTagName('li').length; i++) {
        let notes = noteList.getElementsByTagName('li')[i];
        console
        if(notes.getAttribute('data-set') < createLi.getAttribute('data-set'))
        notes.style.display = 'none';
        if(i === 5) {
          break;
        }
      }
      createAnc.innerText = pagesCount;
      createAnc.setAttribute('href', '#');
      pages.appendChild(createAnc);
    } else {
      return null;
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
    if(localStorage) {
      pages.style.display = 'flex';
    }
  });

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
        notesCount = 1;
        localStorage.clear();
      }
    }
  });

  noteList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const closestLi = e.target.closest('LI');
      const btnDiv = closestLi.querySelector('.btnDiv');
      let input = closestLi.querySelector('input');
      let createSpan = document.createElement('span');
      let noteSpan = closestLi.querySelector('span');
      if (e.target.className === 'delete') {
        let li = e.target.parentNode;
        let liIndex = closestLi.getAttribute('data-index');
        let liClass = li.className;
        findRemoveItem(savedNotePad, indexValue, noteSpan, setValue);
        createStorage(setValue);
        closestLi.remove();
        localStorage.removeItem(liClass);
        dataIndex - 1;
        let notesLi = noteList.getElementsByTagName('li');
        for(let i=0; i<notesLi.length; i++) {
          let noteLi = notesLi[i];
          let index = noteLi.getAttribute('data-index');
          let set = noteLi.getAttribute('data-set');
          if(index > liIndex) {
            noteLi.setAttribute('data-index', index - 1);
            if(noteLi.getAttribute('data-index').includes(4) || noteLi.getAttribute('data-index').includes(9)) {
              noteLi.setAttribute('data-set', set - 1);
              if(noteLi.nextElementSibling.style.display === 'flex') {
                noteLi.style.display = 'flex';
              }
            }
          } else {
            return null;
          }
          
        }

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
        createStorage(setValue);
        insertNote(closestLi, createSpan, editDelete, input, btnDiv);
      }
      if(e.target.className === 'cancel') {
        createSpan.innerText = savedNotePad;
        insertNote(closestLi, createSpan, editDelete, input, btnDiv);
      }
    }

  });

  pages.addEventListener('click', (e)=> {
    if(e.target.closest('div').className === 'pages') {
      const notes = noteList.getElementsByTagName('li');
      if(e.target.tagName === 'A') {
        const pagesIndex = e.target;
        const pagesLinks = pages.getElementsByTagName('a');
        let pageSelect = pagesIndex.innerText;
        for(let j=0; j<pagesLinks.length; j++) {
          let pageLink = pagesLinks[j];
            pageLink.className = '';
        }
        pagesIndex.className = 'active';
        for (let i=0; i<notes.length; i++) {
          let note = notes[i];
          let dataPage = note.getAttribute('data-set');
          // console.log(note.getAttribute('data-set'))
          if(dataPage === pageSelect) {
            note.style.display = 'flex';
          } else {
            note.style.display = 'none';
          }
        }
      }
    }
  });
});