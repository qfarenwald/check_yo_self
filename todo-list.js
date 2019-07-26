class ToDoList {
  constructor(title) {
    this.title = title;
    this.tasks = [
      // {this.check = false;
      //   this.item = 'string'},
      // {this.check = false;
      //   this.item = 'string'}
    ];
    this.id = dateTime();
    // how write above?
    this.urgent = false;
  }

  saveToStorage(globalArray) {
    // localStorage.setItem('theIdeas', JSON.stringify(globalArray));
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
