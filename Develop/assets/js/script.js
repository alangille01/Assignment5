// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return nextId++;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    console.log("Creating task card:", task);
    return $(`
    <div class="card task-card mb-3" data-id="${task.id}"">
      <div class="card-body">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>
  `);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    console.log("Rendering task list:", taskList); 
    ['todo', 'in-progress', 'done'].forEach(status => {
        $(`#${status}-cards`).empty();
    });

    taskList.forEach(task => {
        const taskCard = createTaskCard(task);
        $(`#${task.status}-cards`).append(taskCard);
        console.log($(`#${task.status}-cards`))
        taskCard.draggable({
            revert: "invalid",
            start: function () {
                $(this).css("z-index", 1000);
            },
            stop: function () {
                $(this).css("z-index", 1);
            }
        });
    });
}

// Save tasks and nextId to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(taskList));
    localStorage.setItem('nextId', JSON.stringify(nextId));
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
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
    $('#formModal').modal('hide');
    $('#taskForm')[0].reset();
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
