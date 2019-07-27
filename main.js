var listsArray = [];
var aside = document.querySelector('.aside');
var main = document.querySelector('.main');
var makeTaskListBtn = document.querySelector('.aside__btn');
var paragraph = document.querySelector('.main__paragraph');
var taskTitle = document.querySelector('.aside__input--title');
var taskItem = document.querySelector('.aside__input--item');

getLists();
reDisplayLists();

aside.addEventListener('click', makeNewList);

function getLists() {
  if (JSON.parse(localStorage.getItem('theLists')) === null) {
  } else {
  listsArray = JSON.parse(localStorage.getItem('theLists')).map(function({title}) {
    return new ToDoList(title);
    });
  }
}

function reDisplayLists() {
  for (var i = 0; i < listsArray.length; i++) {
    generateTaskList(listsArray[i]);
  }
}

function makeNewList(e) {
  e.preventDefault();
  var list = new ToDoList(taskTitle.value);
  listsArray.push(list);
  list.saveToStorage(listsArray);
  generateTaskList(list);
  clearFormInputs();
}

function clearFormInputs() {
  taskTitle.value = "";
  taskItem.value = "";
}

function generateTaskList() {
  main.insertAdjacentHTML ('afterbegin',
 `<article class="main__article data-id=id">
   <h2 class="article__h2">Task Title</h2>
   <hr>
   <section class="article__section1">
     <img class="article__section--img1" src="images/checkbox.svg" alt="unclicked checkbox image">
     <p class="article__section--p">String of idea text. String of idea text. String of idea text. String of idea text.</p>
   </section>
   <hr>
   <section class="article__section2">
     <div class="article__section2--container">
       <img class="article__section--img2" src="images/urgent.svg" alt="white colored unactivated lightning bolt image">
       <h4 class="article__section--h4">URGENT</h4>
     </div>
     <div class="article__section2--container">
       <img class="article__section--img3" src="images/delete.svg" alt="white colored unactivated x image">
       <h4 class="article__section--h4">DELETE</h4>
     </div>
   </section>
 </article>`)
 listMessage();
};

function listMessage() {
  if (listsArray.length === 0) {
    paragraph.classList.remove('hidden');
  } else if (listsArray.length !== 0) {
    paragraph.classList.add('hidden');
  }
}
// will not work yet b/c nothing is going into listsArray
