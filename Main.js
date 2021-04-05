// i don't think this line does anything.
fetch("text.json");

// prefer `const`
let noteSave = document.getElementById("noteSave");
let buttonSelector = document.querySelector("button");
let clearInput = document.getElementById("clearInput");
let notePad = document.getElementById("notePad");
let getDeleteAll = document.getElementById("deleteAllInputs");
let noInput = document.getElementById('noInput');
let noteList = document.getElementById("noteList");
let noteContainer = document.getElementById("noteContainer")

// you don't really use functions except for callbacks. you can use functions
// to break up your code and make it more readable.
//
// for example, instead of a makePizza function that's 25 lines, you can have
// these functions with 3 lines each and call them from makePizza: makeDough,
// makeSauce, placeIngredients, bakePizza. this means makePizza will be 5 lines
// instead of 25.
//
// there will also be less variables in any given scope, and you will have
// given names to the steps within makePizza.
//
// all this stuff adds up big-time for code readability, and writing readable
// code is the hardest and most important part of programming.
//
// try breaking up all the code you write into functions with less than 5 lines
// each.
window.addEventListener("load", function () {

  for (let i = 0; i < localStorage.length; i++) {

    // you probably don't need to check if `localStorage` exists at all, or at
    // least you can move the for-loop inside the if-statement. especially
    // because the `else` block seems like it only needs to run once. currently
    // it will run N times where N = localStorage.length.
    if (localStorage) {
      // prefer `const`
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);


      noInput.style.visibility = "hidden";
      
      const lsNoteList = key;

      // these variables don't need to be declared with `let` because they
      // aren't reassigned (although properties of the objects they reference
      // are assigned. e.g., `newLi.id = "noteListItem";`). you should prefer
      // `const` over `let`. (there are other places where you use `let`
      // unnecessarily, but i'll just point it out here. try using "ESLint", a
      // JavaScript linter)
      let newLi = document.createElement("li");
      let newDeleteBtn = document.createElement("button");
      let newEditBtn = document.createElement("button");
      let newDiv = document.createElement("div");

      // IDs must be globally unique. for any given ID, there must be _at most_
      // one element with that ID every delete button you create has the ID
      // "deleteButton", which is invalid (although browsers and JS engines are
      // very forgiving and will try to do what they think you mean anyway)
      newDeleteBtn.id = "deleteButton";
      newEditBtn.id = "editButton";

      noteList.insertAdjacentElement("beforeend", newLi);
      newLi.innerText = localStorage.getItem(key);
      newLi.id = "noteListItem";
      newLi.className = lsNoteList;

      // a lot of these names are very low level instead of having meaning to a
      // human reading the code. like, what is a div? nothing in particular.
      // you should give things meaningful names, like "note container" instead
      // of "new div".
      newLi.appendChild(newDiv);
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

});

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
    noteList.insertAdjacentElement('beforeend', newLi);
    localStorage.setItem(setNoteList, notePad.value);
    newLi.id = "noteListItem";
    newLi.className = setNoteList;
    newLi.innerHTML = notePadValue;
    newLi.appendChild(newDiv);
    newDiv.id = 'itemBtnContainter';
    newDiv.insertAdjacentElement('afterbegin', newDeleteBtn);
    newDiv.insertAdjacentElement('afterbegin', newEditBtn);
    newDeleteBtn.className = setNoteList;
    newEditBtn.className = setNoteList;
    newDeleteBtn.innerHTML = "Delete";
    newEditBtn.innerHTML = "Edit";
    notePad.value = "";

  });



noteContainer.addEventListener("click", (e) => {

  // consistent spacing helps with readability a lot.
      // why are these indented so far in? you generally want to raise the
      // indent level _once_ (two spaces) for each open brace {, and lower the
      // indent level (once) for each closing brace.
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

      if (isEditBtn && targetLi.className === e.target.className) {
      let textContent = targetLi.textContent;
      targetLi.remove();
      localStorage.removeItem(targetLi.className);
      notePad.value = textContent.replace("EditDelete", "")

        if (noteList.innerHTML === '') {
          noInput.style.visibility = 'visible';
        }


      }

})

clearInput.addEventListener("click", function () {
  notePad.value = null;
});

getDeleteAll.addEventListener('click', function () {

  // ^ try not to have lots of random blank lines. it hurts readability. one
  // blank line between statements in a code block (not at the beginning) is
  // much more idiomatic.
  noteList.innerHTML = '';
  noInput.style.visibility = 'visible';
  localStorage.clear();
});