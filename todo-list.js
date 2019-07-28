class ToDoList {
  constructor(id, title) {
    this.id = id || Date.now();
    this.title = title;
    this.tasks = [];
    this.urgent = false;
  }

  saveToStorage(listsArray) {
    localStorage.setItem('theLists', JSON.stringify(listsArray));
  }

  deleteFromStorage(index) {
    listsArray.splice(index, 1);
    saveToStorage(listsArray);
  }
  // will get error till index is found

  updateToDo() {

  }

  updateTask() {

  }
}

// step 1: on function that gets info, then invokes the next two
// step 1a: make constuctor with empty array
// step 1b: make function that puts objects in array
// like sphinx
