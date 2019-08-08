var listsArray = [];
var tasksArray = [];
var aside = document.querySelector('.aside');
var main = document.querySelector('.main');
var makeTaskListBtn = document.querySelector('.aside__btn');
var addTaskBtn = document.querySelector('.aside__img');
var paragraph = document.querySelector('.main__paragraph');
var taskTitle = document.querySelector('.aside__input--title');
var taskItem = document.querySelector('.aside__input--item');
var taskItemList = document.querySelector('.aside__itemlist--container');
var clearAllBtn = document.querySelector('#ClearAllBtn');

aside.addEventListener('click', asideHandlerClick);
main.addEventListener('click', mainHandler);
aside.addEventListener('keyup', asideHandlerKeyup);
window.addEventListener('load', loadHandler)

function loadHandler() {
  getLists();
  reDisplayCards();
}

function asideHandlerKeyup(e) {
  e.preventDefault(e);
  enableMakeTaskListBtn(e);
  enableAddItemBtn(e);
  enableClearAllBtn(e);
}

function asideHandlerClick(e) {
  e.preventDefault();
  if (e.target.closest('#MakeTaskListBtn')) {
    makeNewList(e);
    enableMakeTaskListBtn(e);
    enableClearAllBtn(e);
  }

  if (e.target.closest('.aside__img')) {
    generateTaskItems(e);
    taskItem.value = "";
    enableAddItemBtn(e);
    enableMakeTaskListBtn(e);
    enableClearAllBtn(e);
  }

  if (e.target.closest('.article__section--img1')) {
    deleteItem(e);
  }

  if (e.target.closest('#ClearAllBtn')) {
    clearFormInputs();
    enableClearAllBtn(e);
    enableMakeTaskListBtn(e);
  }
}

function mainHandler(e) {
  if (e.target.closest('.article__section--img3')) {
    deleteList(e);
  }

  if (e.target.closest('.article__section--img1')) {
    toggleCheck(e);
  }

  if (e.target.closest('.article__section--img2')) {
    toggleUrgent(e);
  }
}

function enableClearAllBtn(e) {
  e.preventDefault;
  if (taskTitle.value !== "" && tasksArray.length > 0) {
    clearAllBtn.disabled = false;
  } else {
    clearAllBtn.disabled = true;
  }
}

function enableMakeTaskListBtn(e) {
  e.preventDefault;
  if (taskTitle.value !== "" && tasksArray.length > 0) {
    makeTaskListBtn.disabled = false;
  } else {
    makeTaskListBtn.disabled = true;
  }
}

function enableAddItemBtn(e) {
  e.preventDefault;
  if (taskItem.value !== "") {
    addTaskBtn.disabled = false;
  } else {
    addTaskBtn.disabled = true;
  }
}

function findId() {
  var card = event.target.closest('.main__article');
  if (listsArray.length > 0 && card) {
    return parseInt(event.target.closest('.main__article').dataset.id);
  }
}

function findIdOfItem(e) {
  return parseInt(e.target.parentNode.childNodes[3].attributes[1].nodeValue);
}

function findIndex(e) {
  var id = findId(e);
  for (var i = 0; i < listsArray.length; i++) {
    if (id === listsArray[i].id) {
      return parseInt(i);
    }
  }
}

function countTrue(e) {
  var cardIndex = findIndex(e);
  var newTaskArray = listsArray[cardIndex].tasks;
  var count = 0;
  for (var i = 0; i < newTaskArray.length; i++) {
    if (newTaskArray[i].check === true) {
      ++count;
    }
  }
  return count === newTaskArray.length ? true : false;
}

function deleteList(e) {
  var cardIndex = findIndex(e);
  var trueCount = countTrue(e);
  if (trueCount === true) {
    e.target.closest('article').remove();
    listsArray[cardIndex].deleteFromStorage(cardIndex, listsArray);
    listMessage();
  }
}

function deleteItem(e) {
  var target = findIdOfItem(e);
  var filter = tasksArray.filter(function(obj) {
    return obj.id !== target;
  });
  tasksArray = filter;
  var list = new ToDoList(Date.now(), taskTitle.value);
  list.saveToStorage(listsArray);
  e.target.closest('.article__section1').remove();
}

function makeNewList(e) {
  e.preventDefault();
  var list = new ToDoList(Date.now(), taskTitle.value);
  listsArray.push(list);
  createObjectOfItems(list);
  generateTaskCard(list);
  list.saveToStorage(listsArray);
  clearFormInputs();
}

function createObjectOfItems(list) {
  for (var i = 0; i < tasksArray.length; i++) {
    list.tasks.push({
      check: false,
      item: tasksArray[i].task,
      id: tasksArray[i].id});
  }
}

function clearFormInputs() {
  taskTitle.value = "";
  taskItem.value = "";
  tasksArray = [];
  taskItemList.innerHTML = "";
}

function listMessage() {
  if (listsArray.length === 0) {
    paragraph.classList.remove('hidden');
  } else if (listsArray.length !== 0) {
    paragraph.classList.add('hidden');
  }
}

function getCheckBoxImage(listTask) {
  var img = null;
  listTask ? img = "checkbox-active.svg" : img = "checkbox.svg";
  return img;
}

function toggleCheck(e) {
  var cardId = findId(e);
  var cardIndex = findIndex(e);
  var cardObject = listsArray.find(function(list) {
    return list.id === cardId;
  });
  var taskId = findIdOfItem(e);
  var checkImg = e.target.closest('.article__section--img1');
  var active = "images/checkbox-active.svg";
  var inactive = "images/checkbox.svg";
  var cardText = e.target.parentNode.childNodes[3];
  for (var i = 0; i < cardObject.tasks.length; i++) {
    if (cardObject.tasks[i].id === taskId) {
      if (cardObject.tasks[i].check === false) {
        cardObject.tasks[i].check = true;
        checkImg.src = active;
        cardText.classList.add('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      } else {
        cardObject.tasks[i].check = false;
        checkImg.src = inactive;
        cardText.classList.remove('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      }
    }
  }
}

function getUrgentImage(listTask) {
  var urgentImg = null;
  listTask ? urgentImg = "urgent-active.svg" : urgentImg = "urgent.svg";
  return urgentImg;
}

function toggleUrgent(e) {
  var cardId = findId(e);
  var cardIndex = findIndex(e);
  var cardObject = listsArray.find(function(list) {
    return list.id === cardId;
  });
  var urgentImg = e.target.closest('.article__section--img2');
  var active = "images/urgent-active.svg";
  var inactive = "images/urgent.svg";
  var cardBkgd = e.target.parentNode.parentNode.parentNode;
  if (cardObject.urgent === false) {
    cardObject.urgent = true;
    urgentImg.src = active;
    cardBkgd.classList.add('main__article--urgent');
    listsArray[cardIndex].updateTask(listsArray);
  } else {
    cardObject.urgent = false;
    urgentImg.src = inactive;
    cardBkgd.classList.remove('main__article--urgent');
    listsArray[cardIndex].updateTask(listsArray);
  }
}

function generateTaskItems() {
  var dateId = Date.now();
  taskItemList.insertAdjacentHTML ('beforeend',
    `<section class="article__section1">
    <img class="article__section--img1" src="images/delete.svg" alt="circle delete button">
    <p class="article__section--p" data-id=${dateId}>${taskItem.value}</p>
    </section>`)
  tasksArray.push({task: taskItem.value, id: dateId});
}

function returnTaskElements(list) {
  var italic = "";
  var codeBlock = "";
  for (var i = 0; i < list.tasks.length; i++) {
    list.tasks[i].check ?  italic = "italic" : italic = "";
    codeBlock += `<section class="article__section1">
    <img class="article__section--img1" src="images/${getCheckBoxImage(list.tasks[i].check)}" alt="circle checkbox button">
    <p class="article__section--p ${italic}" data-id=${list.tasks[i].id}>${list.tasks[i].item}</p>
    </section>`;
  }
  return codeBlock;
}

function generateTaskCard(list) {
  var bkgdColor = "";
  list.urgent ?  bkgdColor = "main__article--urgent" : bkgdColor = "";
  main.insertAdjacentHTML ('afterbegin',
    `<article class="main__article ${bkgdColor}" data-id=${list.id}>
    <h2 class="article__h2">${list.title}</h2>
    <hr>
    ${returnTaskElements(list)}
    <hr>
    <section class="article__section2">
     <div class="article__section2--container">
       <img class="article__section--img2" src="images/${getUrgentImage(list.urgent)}" alt="lightning bolt image">
       <h4 class="article__section--h4">URGENT</h4>
     </div>
     <div class="article__section2--container">
       <img class="article__section--img3" src="images/delete.svg" alt="circle with an x in the middle image">
       <h4 class="article__section--h4">DELETE</h4>
     </div>
    </section>
   </article>`)
  listMessage();
}

function getLists() {
  if (JSON.parse(localStorage.getItem('theLists')) === null) {
  } else {
    listsArray = JSON.parse(localStorage.getItem('theLists')).map(function(obj) {
      return new ToDoList(obj.id, obj.title, obj.tasks, obj.urgent);
    });
  }
}

function reDisplayCards() {
  for (var i = 0; i < listsArray.length; i++) {
    generateTaskCard(listsArray[i]);
  }
}
