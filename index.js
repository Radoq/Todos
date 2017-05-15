//Arrays
//var todos = ["item1", "item2", "item3"];
//todos.push("item4"); //adding
//todos.push("item5");
//todos.slice(3, 5); // selecting item and creating new array but not affecting old array. first argument is included but not second.
//todos.splice(3, 2); //deleting items. first argument is where to start, second how many.
//todos[0]; // first item. counting stats from 0.
//todos[0] = "item1updated"; //updating items
//Functions
//function functionname(parameters){} //if you declare function in variable use ;
//functionname(arguments); //function call

//Objects
//var gordon = {
//  name: "Gordon",
//  sayName: function(){
//   console.log(this.name);
//  }
//};
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.  
    this.todos.forEach(function(todo){
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    // Case 1: If everything’s true, make everything false.
    if (completedTodos === totalTodos) {      
      this.todos.forEach(function(todo){
        todo.completed = false;
      });
    // Case 2: Otherwise, make everything true.
    } else {            
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    }
    
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);    
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');      
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    },this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";    
    return deleteButton;
  },
  setUpEventListeners: function(){
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event){  
      var elementClicked = event.target;
      if (elementClicked.className === "deleteButton"){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));  
      }
    });    
  }
};

view.setUpEventListeners();
//Loops
//for (var i=0;i<3;i++){
//  console.log("hey");
//}
//i = i + 1
// i++
// if (condition){
    //statement
//} else if(condition){
    //statement
//} 
// else{
   //statement 
//}