class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id;
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = urgent || false;
  }

  saveToStorage(listsArray) {
    localStorage.setItem('theLists', JSON.stringify(listsArray));
  }

  deleteFromStorage(cardIndex, listsArray) {
    listsArray.splice(cardIndex, 1);
    this.saveToStorage(listsArray);
  }

  updateTask(listsArray) {
    this.saveToStorage(listsArray);
  }

  updateToDo(listsArray) {
    this.saveToStorage(listsArray);
  }
}
