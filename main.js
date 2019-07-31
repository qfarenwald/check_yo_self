var listsArray = [];
var tasksArray = [];
var aside = document.querySelector('.aside');
var main = document.querySelector('.main');
var makeTaskListBtn = document.querySelector('.aside__btn');
var addTaskBtn = document.querySelector('.aside__img')
var paragraph = document.querySelector('.main__paragraph');
var taskTitle = document.querySelector('.aside__input--title');
var taskItem = document.querySelector('.aside__input--item');
var taskItemHeading = document.querySelector('#TaskItemHeading');
var taskItemList = document.querySelector('.aside__itemlist--container');
var articleSection1 = document.querySelector('.article__section1');
var deleteItemBtn = document.querySelector('.article__section--img1');
var clearAllBtn = document.querySelector('#ClearAllBtn');

getLists();
reDisplayCards();

// aside.addEventListener('keyup', asideHandlerKeyup);
aside.addEventListener('click', asideHandlerClick);
aside.addEventListener('keyup', enableMakeTaskListBtn);
aside.addEventListener('keyup', enableAddItemBtn);
aside.addEventListener('keyup', enableClearAllBtn);
main.addEventListener('click', mainHandler);

// funtion asideHandlerKeyup(e) {
//
// }

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
    console.log('tasksArray', tasksArray)
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

  if(e.target.closest('.article__section--img1')) {
    toggleCheck(e);
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

function findId(e) {
  var card = event.target.closest('.main__article');
  if (listsArray.length > 0 && card) {
    return parseInt(event.target.closest('.main__article').dataset.id);
  }
};

function findIdOfItem(e) {
  return parseInt(e.target.parentNode.childNodes[3].attributes[1].nodeValue);
};


function findIndex(e) {
  var id = findId(e);
  for (var i = 0; i < listsArray.length; i++) {
    if (id === listsArray[i].id) {
      return parseInt(i);
    }
  }
};

// function deleteList(e) {
//   var target = findId(e);
//   var filter = listsArray.filter(function(obj) {
//       return obj.id !== target;
// })
//   listsArray = filter;
//   var list = new ToDoList(Date.now(), taskTitle.value);
//   list.saveToStorage(listsArray);
//   e.target.closest('article').remove();
//   listMessage();
// }

function deleteList(e, index) {
  var cardIndex = findIndex(e);
  e.target.closest('article').remove();
  listsArray[cardIndex].deleteFromStorage(listsArray);
  listMessage();
}

function deleteItem(e){
  var target = findIdOfItem(e);
  var filter = tasksArray.filter(function(obj) {
      return obj.id !== target;
})
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

function clearFormInputs() {
  taskTitle.value = "";
  taskItem.value = "";
  tasksArray = [];
  taskItemList.innerHTML = '';
}

function toggleCheck(e) {
  var cardId = findId(e);
  var cardIndex = findIndex(e);
  var cardObject = listsArray.find(function(list) {
   return list.id === cardId
   })
  var taskId = findIdOfItem(e);
  var checkImg = e.target.closest('.article__section--img1');
  var active = "images/checkbox-active.svg";
  var inactive = "images/checkbox.svg";

  console.log('one', listsArray)

  for(var i = 0; i < cardObject.tasks.length; i++) {
    if(cardObject.tasks[i].id === taskId) {
      if(cardObject.tasks[i].check === false) {
        cardObject.tasks[i].check = true;
        checkImg.src = active;
        listsArray[cardIndex].saveToStorage(listsArray);
      }
      else {
        cardObject.tasks[i].check = false;
        checkImg.src = inactive;
        listsArray[cardIndex].saveToStorage(listsArray);
      }
    }
  }
    console.log('two', listsArray)
}

function createObjectOfItems(list){
  for(var i = 0; i < tasksArray.length; i++){
    list.tasks.push({check: false, item: tasksArray[i].task, id: tasksArray[i].id});
  }
}

function generateTaskItems({list}) {
  var dateId = Date.now();
  taskItemList.insertAdjacentHTML ('beforeend',
 `<section class="article__section1">
   <img class="article__section--img1" src="images/delete.svg" alt="circle delete button">
   <p class="article__section--p" data-id=${dateId}>${taskItem.value}</p>
 </section>`)
  tasksArray.push({task: taskItem.value, id: dateId});
};

function returnTaskElements(list) {
  var codeBlock = "";
  for(var i = 0; i < list.tasks.length; i++){
  codeBlock += `<section class="article__section1">
  <img class="article__section--img1" src="images/${getCheckBoxImage(list.tasks[i].check)}" alt="circle checkbox button">
    <p class="article__section--p" data-id=${list.tasks[i].id}>${list.tasks[i].item}</p>
    </section>`;
  }
  return codeBlock;
}

function getCheckBoxImage(listTask) {
  var img = null;
  listTask ? img = "checkbox-active.svg" : img = "checkbox.svg";
  return img;
}

function generateTaskCard(list) {
  main.insertAdjacentHTML ('afterbegin',
 `<article class="main__article" data-id=${list.id}>
   <h2 class="article__h2">${list.title}</h2>
   <hr>
   ${returnTaskElements(list)}
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
