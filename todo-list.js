class ToDoList {
  constructor(id, title, tasks, urgent) {
    this.id = id || Date.now();
    this.title = title;
    this.tasks = tasks || [];
    this.urgent = urgent;
  }

  saveToStorage(listsArray) {
    localStorage.setItem('theLists', JSON.stringify(listsArray));
  }

  deleteFromStorage(e, index) {
    listsArray.splice(index, 1);
    this.saveToStorage(listsArray);

  }

  updateToDo() {

  }

  updateTask() {

  }
}
