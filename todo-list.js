class ToDoList {
  constructor(title) {
    this.title = title;
    this.tasks = [
      // {this.check = false;
      //   this.item = 'string'},
      // {this.check = false;
      //   this.item = 'string'}
    ];
    this.id = Date.now();
    this.urgent = false;
  }

  saveToStorage(listsArray) {
    localStorage.setItem('theLists', JSON.stringify(listsArray));
  }

  deleteFromStorage(index) {
    // globalArray.splice(index, 1);
    // saveToStorage(globalArray);
  }

  updateToDo() {

  }

  updateTask() {

  }
}

// step 1: on function that gets info, then invokes the next two
// step 1a: make constuctor with empty array
// step 1b: make function that puts objects in array
// like sphinx
