// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const title = $('#taskTitle').val();
    const dueDate = $('#taskDueDate').val();
    const description = $('#taskDescription').val();

    const newTask = {
        id: generateTaskId(),
        title,
        dueDate,
        description,
        status: 'todo'
    };

    console.log("Adding new task:", newTask);
    taskList.push(newTask);
    saveTasks();
}

// Save tasks and nextId to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log("Document ready, initializing..."); 
    renderTaskList();
});
