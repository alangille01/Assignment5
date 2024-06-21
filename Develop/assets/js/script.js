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
    const borderColour = getCardBackgroundColour(task.dueDate);
    return $(`
    <div class="card task-card mb-3" data-id="${task.id}" style="border: 5px solid ${borderColour};">
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
    renderTaskList();
    $('#formModal').modal('hide');
    $('#taskForm')[0].reset();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
    const taskId = $(event.target).closest('.task-card').data('id');
    console.log("Deleting task with id:", taskId);
    taskList = taskList.filter(task => task.id !== taskId);
    saveTasks();
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
    const taskId = ui.helper.data('id');
    console.log($(this).attr('id'))
    const newStatus = $(this).attr('id');
    console.log("Dropping task with id:", taskId, "to new status:", newStatus);
    const task = taskList.find(task => task.id === taskId);
    task.status = newStatus;
    saveTasks();
    renderTaskList();
}

function getCardBackgroundColour(taskDueDate) {
    // Determine the current date
    let currentDate = new Date();
    // Parse the task's due date
    let dueDate = new Date(taskDueDate);
    
    // Calculate the difference in days
    let timeDiff = dueDate.getTime() - currentDate.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
    // Determine the background color based on the due date
    let borderColour = '';
    if (diffDays < 0) {
        // Task is overdue
        borderColour = 'red';
    } else if (diffDays < 3) {
        // Task is due soon (within 3 days)
        borderColour = 'yellow';
    } else {
        // Default background color for tasks not overdue or due soon
        borderColour = 'green';
    }

    return borderColour;
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    console.log("Document ready, initializing..."); 
    renderTaskList();
    $('#taskDueDate').datepicker();

    $('#taskForm').on('submit', handleAddTask);
    $(document).on('click', '.delete-task', handleDeleteTask);

    $('.lane').droppable({
        accept: ".task-card",
        drop: handleDrop
    });
});
