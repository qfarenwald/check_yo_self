$( document ).ready(function() {

const aside = $(".aside");
const main = $(".main");
const taskTitle = $(".aside__input--title");
const taskItem = $(".aside__input--item");
const taskItemList = $(".aside__itemlist--container");

aside.on("click", asideHandlerClick);
main.on("click", mainHandler);
aside.on("keyup", asideHandlerKeyup);
$(window).on("load", loadHandler)

let listsArray = [];
let tasksArray = [];

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
    taskItem[0].value = "";
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

enableClearAllBtn = e => {
  e.preventDefault;
  const clearAllBtn = $("#ClearAllBtn");
  taskTitle[0].value !== "" && tasksArray.length > 0 ? clearAllBtn[0].disabled = false : clearAllBtn[0].disabled = true;
}

enableMakeTaskListBtn = e => {
  e.preventDefault;
  const makeTaskListBtn = $(".aside__btn");
  taskTitle[0].value !== "" && tasksArray.length > 0 ? makeTaskListBtn[0].disabled = false : makeTaskListBtn[0].disabled = true
}

enableAddItemBtn = e => {
  e.preventDefault;
  const addTaskBtn = $(".aside__img");
  taskItem[0].value !== "" ? addTaskBtn[0].disabled = false : addTaskBtn[0].disabled = true
}

findId = e => {
  const card = e.target.closest('.main__article');
  if (listsArray.length > 0 && card) {
    return parseInt(e.target.closest('.main__article').dataset.id);
  }
}

findIdOfItem = e => {
  return parseInt(e.target.parentNode.childNodes[3].attributes[1].nodeValue);
}

findIndex = e => {
  let id = findId(e);
  let item = listsArray.find(element => {
    return element.id === id;
  })
  return listsArray.indexOf(item);
}

countTrue = e => {
  let cardIndex = findIndex(e);
  let newTaskArray = listsArray[cardIndex].tasks;
  let count = 0;
  newTaskArray.forEach(element => {
    if (element.check === true) {
      ++count;
    }
  })
  return count === newTaskArray.length ? true : false;
}

deleteList = e => {
  let cardIndex = findIndex(e);
  let trueCount = countTrue(e);
  if (trueCount === true) {
    e.target.closest('article').remove();
    listsArray[cardIndex].deleteFromStorage(cardIndex, listsArray);
    listMessage();
  }
}

deleteItem = e => {
  let target = findIdOfItem(e);
  let filter = tasksArray.filter(obj => {
    return obj.id !== target;
  });
  tasksArray = filter;
  e.target.closest('.article__section1').remove();
}

makeNewList = e => {
  e.preventDefault();
  let list = new ToDoList(Date.now(), taskTitle[0].value);
  listsArray.push(list);
  createObjectOfItems(list);
  generateTaskCard(list);
  list.saveToStorage(listsArray);
  clearFormInputs();
}

createObjectOfItems = list => {
  tasksArray.forEach(element => {
    list.tasks.push({
      check: false,
      item: element.task,
      id: element.id});
  })
}

clearFormInputs = () => {
  taskTitle[0].value = "";
  taskItem[0].value = "";
  tasksArray = [];
  taskItemList[0].innerHTML = "";
}

listMessage = () => {
  const paragraph = $(".main__paragraph");
  listsArray.length === 0 ? paragraph.removeClass("hidden") : paragraph.addClass("hidden")
}

// built this into function... good idea?
// function getCheckBoxImage(listTask) {
//   var img = null;
//   listTask ? img = "checkbox-active.svg" : img = "checkbox.svg";
//   return img;
// }

// built this into function... good idea?
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
//   cardObject.tasks.forEach(element => {
//     switch (element.id === taskId) {
//       case element.check === false: {
//         element.check = true;
//         checkImg.src = "images/checkbox-active.svg";
//         cardText.classList.add('italic');
//         listsArray[cardIndex].updateToDo(listsArray);
//         break;
//     }
//       default: {
//         element.check = false;
//         checkImg.src = "images/checkbox.svg";
//         cardText.classList.remove('italic');
//         listsArray[cardIndex].updateToDo(listsArray);
//         break;
//         }
//       }
//     })
//   }
//refactor

// original
toggleCheck = e => {
  let cardId = findId(e);
  let cardIndex = findIndex(e);
  let cardObject = listsArray.find(list => {
    return list.id === cardId;
  });
  let taskId = findIdOfItem(e);
  let checkImg = e.target.closest('.article__section--img1');
  let cardText = e.target.parentNode.childNodes[3];
  cardObject.tasks.forEach(element => {
    if (element.id === taskId) {
      if (element.check === false) {
        element.check = true;
        checkImg.src = "images/checkbox-active.svg";
        cardText.classList.add('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      } else {
        element.check = false;
        checkImg.src = "images/checkbox.svg";
        cardText.classList.remove('italic');
        listsArray[cardIndex].updateToDo(listsArray);
      }
    }
  })
}

// needs refactoring once toggleCheck is done
toggleUrgent = e => {
  let cardId = findId(e);
  let cardIndex = findIndex(e);
  let urgentImg = e.target.closest('.article__section--img2');
  let cardBkgd = e.target.parentNode.parentNode.parentNode;
  let cardObject = listsArray.find(list => {
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

generateTaskItems = () => {
  let dateId = Date.now();
  document.querySelector('.aside__itemlist--container').insertAdjacentHTML ('beforeend',
    `<section class="article__section1">
    <img class="article__section--img1" src="images/delete.svg" alt="circle delete button">
    <p class="article__section--p" data-id=${dateId}>${taskItem[0].value}</p>
    </section>`)
  tasksArray.push({task: taskItem[0].value, id: dateId});
}

returnTaskElements = list => {
  let italic = "";
  let img = "";
  let codeBlock = "";
  list.tasks.forEach(element => {
    element.check ?  italic = "italic" : italic = "";
    element.check ?  img = "checkbox-active.svg" : img = "checkbox.svg";
    codeBlock += `<section class="article__section1">
    <img class="article__section--img1" src="images/${img}" alt="circle checkbox button">
    <p class="article__section--p ${italic}" data-id=${element.id}>${element.item}</p>
    </section>`;
  })
  return codeBlock;
}

generateTaskCard = list => {
  let urgentImg = "";
  let bkgdColor = "";
  list.urgent ?  bkgdColor = "main__article--urgent" : bkgdColor = "";
  list.urgent ?  urgentImg = "urgent-active.svg" : urgentImg = "urgent.svg";
  document.querySelector('.main').insertAdjacentHTML ('afterbegin',
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

getLists = () => {
  JSON.parse(localStorage.getItem('theLists')) === null ? listsArray : listsArray = JSON.parse(localStorage.getItem('theLists')).map(obj => {
      return new ToDoList(obj.id, obj.title, obj.tasks, obj.urgent);
    });
}

reDisplayCards = () => {
  listsArray.forEach(element => {
    generateTaskCard(element);
  })
}

});
