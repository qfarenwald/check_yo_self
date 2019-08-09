// start of jQuery ready, dont forget brackets at bottom
// $( document ).ready(function() {

// jQuery selections
// var aside = $(".aside");
// var main = $(".main");
// var taskTitle = $(".aside__input--title");
// var taskItem = $(".aside__input--item");
// var taskItemList = $(".aside__itemlist--container");

// jQuery event handlers
// aside.on("click", asideHandlerClick);
// main.on("click", mainHandler);
// aside.on("keyup", asideHandlerKeyup);
// $(window).on("load", loadHandler)

let listsArray = [];
let tasksArray = [];
const aside = document.querySelector('.aside');
const main = document.querySelector('.main');
const taskTitle = document.querySelector('.aside__input--title');
const taskItem = document.querySelector('.aside__input--item');
const taskItemList = document.querySelector('.aside__itemlist--container');

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
  const clearAllBtn = document.querySelector('#ClearAllBtn');
  taskTitle.value !== "" && tasksArray.length > 0 ? clearAllBtn.disabled = false : clearAllBtn.disabled = true;
}

function enableMakeTaskListBtn(e) {
  e.preventDefault;
  const makeTaskListBtn = document.querySelector('.aside__btn');
  taskTitle.value !== "" && tasksArray.length > 0 ? makeTaskListBtn.disabled = false : makeTaskListBtn.disabled = true
}

function enableAddItemBtn(e) {
  e.preventDefault;
  const addTaskBtn = document.querySelector('.aside__img');
  taskItem.value !== "" ? addTaskBtn.disabled = false : addTaskBtn.disabled = true
}

function findId() {
  const card = event.target.closest('.main__article');
  if (listsArray.length > 0 && card) {
    return parseInt(event.target.closest('.main__article').dataset.id);
  }
}

function findIdOfItem(e) {
  return parseInt(e.target.parentNode.childNodes[3].attributes[1].nodeValue);
}

function findIndex(e) {
  let id = findId(e);
  let item = listsArray.find(function(element) {
    return element.id === id;
  })
  return listsArray.indexOf(item);
}

function countTrue(e) {
  let cardIndex = findIndex(e);
  let newTaskArray = listsArray[cardIndex].tasks;
  let count = 0;
  newTaskArray.forEach(function(element) {
    if (element.check === true) {
      ++count;
    }
  })
  return count === newTaskArray.length ? true : false;
}

function deleteList(e) {
  let cardIndex = findIndex(e);
  let trueCount = countTrue(e);
  if (trueCount === true) {
    e.target.closest('article').remove();
    listsArray[cardIndex].deleteFromStorage(cardIndex, listsArray);
    listMessage();
  }
}

function deleteItem(e) {
  let target = findIdOfItem(e);
  let filter = tasksArray.filter(function(obj) {
    return obj.id !== target;
  });
  tasksArray = filter;
  e.target.closest('.article__section1').remove();
}

function makeNewList(e) {
  e.preventDefault();
  let list = new ToDoList(Date.now(), taskTitle.value);
  listsArray.push(list);
  createObjectOfItems(list);
  generateTaskCard(list);
  list.saveToStorage(listsArray);
  clearFormInputs();
}

function createObjectOfItems(list) {
  console.log('hello')
  tasksArray.forEach(function(element) {
    list.tasks.push({
      check: false,
      item: element.task,
      id: element.id});
  })
}

function clearFormInputs() {
  taskTitle.value = "";
  taskItem.value = "";
  tasksArray = [];
  taskItemList.innerHTML = "";
}

function listMessage() {
  const paragraph = document.querySelector('.main__paragraph');
  listsArray.length === 0 ? paragraph.classList.remove('hidden') : paragraph.classList.add('hidden')
}

// function getCheckBoxImage(listTask) {
//   var img = null;
//   listTask ? img = "checkbox-active.svg" : img = "checkbox.svg";
//   return img;
// }

// function getUrgentImage(listTask) {
//   var urgentImg = null;
//   listTask ? urgentImg = "urgent-active.svg" : urgentImg = "urgent.svg";
//   return urgentImg;
// }

//refactor to switch statement and forEach NOT YET WORKING
// function toggleCheck(e) {
//   var cardId = findId(e);
//   var cardIndex = findIndex(e);
//   var taskId = findIdOfItem(e);
//   var checkImg = e.target.closest('.article__section--img1');
//   var cardText = e.target.parentNode.childNodes[3];
//   var cardObject = listsArray.find(function(element) {
//     return element.id === cardId;
//   });
//   cardObject.tasks.forEach(function(element) {
//     switch (element.id === taskId) {
//       case element.check === false:
//         element.check = true;
//         checkImg.src = "images/checkbox-active.svg";
//         cardText.classList.add('italic');
//         listsArray[cardIndex].updateToDo(listsArray);
//       break;
//       case element.check === true:
//         element.check = false;
//         checkImg.src = "images/checkbox.svg";
//         cardText.classList.remove('italic');
//         listsArray[cardIndex].updateToDo(listsArray);
//       break;
//       }
//     })
//   }
//refactor

// refactor 2 NOT YET WORKING
// function toggleCheck(e) {
//   var cardId = findId(e);
//   var cardIndex = findIndex(e);
//   var cardObject = listsArray.find(function(list) {
//     return list.id === cardId;
//   });
//   var taskId = findIdOfItem(e);
//   var checkImg = e.target.closest('.article__section--img1');
//   var cardText = e.target.parentNode.childNodes[3];
//   cardObject.tasks.forEach(function(element) {
//     if (element.id === taskId) {
//       element.check === false ? element.check = true : element.check = false;
//       listsArray[cardIndex].updateToDo(listsArray);
//       }
//     })
//   }
// refactor

// original
function toggleCheck(e) {
  let cardId = findId(e);
  let cardIndex = findIndex(e);
  let cardObject = listsArray.find(function(list) {
    return list.id === cardId;
  });
  let taskId = findIdOfItem(e);
  let checkImg = e.target.closest('.article__section--img1');
  let cardText = e.target.parentNode.childNodes[3];
  for (var i = 0; i < cardObject.tasks.length; i++) {
    if (cardObject.tasks[i].id === taskId) {
      if (cardObject.tasks[i].check === false) {
        cardObject.tasks[i].check = true;
        checkImg.src = "images/checkbox-active.svg";
        cardText.classList.add('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      } else {
        cardObject.tasks[i].check = false;
        checkImg.src = "images/checkbox.svg";
        cardText.classList.remove('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      }
    }
  }
}

// needs refactoring
function toggleUrgent(e) {
  let cardId = findId(e);
  let cardIndex = findIndex(e);
  let urgentImg = e.target.closest('.article__section--img2');
  let cardBkgd = e.target.parentNode.parentNode.parentNode;
  let cardObject = listsArray.find(function(list) {
    return list.id === cardId;
  });
  if (cardObject.urgent === false) {
    cardObject.urgent = true;
    urgentImg.src = "images/urgent-active.svg";
    cardBkgd.classList.add('main__article--urgent');
    listsArray[cardIndex].updateTask(listsArray);
  } else {
    cardObject.urgent = false;
    urgentImg.src = "images/urgent.svg";
    cardBkgd.classList.remove('main__article--urgent');
    listsArray[cardIndex].updateTask(listsArray);
  }
}

function generateTaskItems() {
  let dateId = Date.now();
  taskItemList.insertAdjacentHTML ('beforeend',
    `<section class="article__section1">
    <img class="article__section--img1" src="images/delete.svg" alt="circle delete button">
    <p class="article__section--p" data-id=${dateId}>${taskItem.value}</p>
    </section>`)
  tasksArray.push({task: taskItem.value, id: dateId});
}

function returnTaskElements(list) {
  let italic = "";
  let img = "";
  let codeBlock = "";
  list.tasks.forEach(function(element) {
    element.check ?  italic = "italic" : italic = "";
    element.check ?  img = "checkbox-active.svg" : img = "checkbox.svg";
    codeBlock += `<section class="article__section1">
    <img class="article__section--img1" src="images/${img}" alt="circle checkbox button">
    <p class="article__section--p ${italic}" data-id=${element.id}>${element.item}</p>
    </section>`;
  })
  return codeBlock;
}

function generateTaskCard(list) {
  let urgentImg = "";
  let bkgdColor = "";
  list.urgent ?  bkgdColor = "main__article--urgent" : bkgdColor = "";
  list.urgent ?  urgentImg = "urgent-active.svg" : urgentImg = "urgent.svg";
  main.insertAdjacentHTML ('afterbegin',
    `<article class="main__article ${bkgdColor}" data-id=${list.id}>
    <h2 class="article__h2">${list.title}</h2>
    <hr>
    ${returnTaskElements(list)}
    <hr>
    <section class="article__section2">
     <div class="article__section2--container">
       <img class="article__section--img2" src="images/${urgentImg}" alt="lightning bolt image">
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
  JSON.parse(localStorage.getItem('theLists')) === null ? listsArray : listsArray = JSON.parse(localStorage.getItem('theLists')).map(function(obj) {
      return new ToDoList(obj.id, obj.title, obj.tasks, obj.urgent);
    });
}

function reDisplayCards() {
  listsArray.forEach(function(element) {
    generateTaskCard(element);
  })
}

// end of jQuery ready
// });
