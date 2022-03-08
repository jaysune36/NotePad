// Created a 2nd js file, to better write my previous code witin the main.js file
document.addEventListener('DOMContentLoaded', ()=> {
  const notePad = document.querySelector('#notePad');
  const inputBtnContainer = document.querySelector('#inputBtnContainer');
  const noInput = document.querySelector('.noInput');
  const noteListContainer = document.querySelector('#noteListContainer');
  const noteList = document.querySelector('.noteList');
  let notesLi = noteList.getElementsByTagName('li');
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

  function elementStyleDisplay(element, display) {
    element.style.display = display;
  }

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
    let createP = document.createElement('p');
    const firstChild = noteList.getElementsByTagName('li')[0];
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
    if(firstChild && firstChild.getAttribute('data-set') < createLi.getAttribute('data-set')) {
      for(let i = 0; i < noteList.getElementsByTagName('li').length; i++) {
        let notes = noteList.getElementsByTagName('li')[i];
        if(notes.getAttribute('data-set') < createLi.getAttribute('data-set'));
        elementStyleDisplay(notes, 'none');
        if(i === 5) {
          break;
        }
      }
      createP.innerText = pagesCount;
      pages.appendChild(createP);
      pageSelect()
    } else {
      return null;
    }
  }

  function pageSelect() {
    let noteSet = noteList.getElementsByTagName('li')[0];
    for(let j=0; j<pages.getElementsByTagName('p').length; j++) {
      let page = pages.getElementsByTagName('p')[j];
      if(page.innerText === noteSet.getAttribute('data-set')) {
        page.className = 'active';
      } else {
        page.className ='';
      }
    }
  }

  function dataPageNoteaAdjustment(elementIndex) {
    for(let i=0; i<notesLi.length; i++) {
      let noteLi = notesLi[i];
      let index = noteLi.getAttribute('data-index');
      let set = noteLi.getAttribute('data-set');
      if(index > elementIndex) {
        noteLi.setAttribute('data-index', index - 1);
        if(noteLi.getAttribute('data-index').includes(4) || noteLi.getAttribute('data-index').includes(9)) {
          noteLi.setAttribute('data-set', set - 1);
          if(noteLi.nextElementSibling.style.display === 'flex') {
            elementStyleDisplay(noteLi, 'flex');
          }
        }
      } else {
        return null;
      }
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
        elementStyleDisplay(noInput, 'none');
      }
    }
  }

  function notesDisplay() {
    let notes = noteList.getElementsByTagName('li');
    const lastItem = notes[0]
    for(let i=0; i<notes.length; i++) {
      let note = noteList.getElementsByTagName('li')[i];
      if(note.getAttribute('data-set') === lastItem.getAttribute('data-set')) {
        elementStyleDisplay(note, 'flex')
      } else {
        return null;
      }
    }
    
  }

  window.addEventListener('load', () => {
    getStorage(); 
    notesDisplay();
    if(localStorage) {
      elementStyleDisplay(pages, 'block');
    }
    pageSelect();
  });

  inputBtnContainer.addEventListener('click', (e) => {
    if (e.target.tagName == 'BUTTON') {
      if (e.target.className == 'noteSave') {
        if (notePad.value) {
          createNote(notePad.value);
          elementStyleDisplay(noInput, 'none');
          elementStyleDisplay(pages, 'block');
          notePad.value = null;
        }
      }

      if (e.target.className == 'clearInput') {
        notePad.value = '';
      }

      if (e.target.className == 'deleteAllInputs') {
        noteList.innerHTML = '';
        elementStyleDisplay(noInput, 'block');
        elementStyleDisplay(pages, 'none');
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
        dataPageNoteaAdjustment(liIndex);
        createStorage(setValue);
        closestLi.remove();
        localStorage.removeItem(liClass);
        dataIndex - 1;
        if(noteList.firstElementChild.getAttribute('data-set') < pagesCount) {
          pagesCount --;
          pages.removeChild(pages.lastElementChild);
          notesDisplay();
        }
        pageSelect();
        if (noteList.innerHTML === '') {
          elementStyleDisplay(noInput, 'block');
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
      if(e.target.tagName === 'P') {
        const pagesIndex = e.target;
        const pagesLinks = pages.getElementsByTagName('p');
        let pageSelect = pagesIndex.innerText;
        for(let j=0; j<pagesLinks.length; j++) {
          let pageLink = pagesLinks[j];
            pageLink.className = '';
        }
        pagesIndex.className = 'active';
        for (let i=0; i<notes.length; i++) {
          let note = notes[i];
          let dataPage = note.getAttribute('data-set');
          if(dataPage === pageSelect) {
            elementStyleDisplay(note, 'flex');
          } else {
            elementStyleDisplay(note, 'none');
          }
        }
      }
    }
  });
});