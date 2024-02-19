// Function to generate a random UUID
function randomUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
// Array to store todo items
let todos = [];

// Selectors
const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const allTasksBtn = document.getElementById('allTasks');
const completedTasksBtn = document.getElementById('completedTasks');
const activeTasksBtn = document.getElementById('activeTasks');

// Event Listeners
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
allTasksBtn.addEventListener('click', showAllTasks);
completedTasksBtn.addEventListener('click', showCompletedTasks);
activeTasksBtn.addEventListener('click', showActiveTasks);

// Check if one theme has been set previously and apply it (or std theme if not found):
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ?
    changeTheme('standard')
    : changeTheme(localStorage.getItem('savedTheme'));

// Functions
function addToDo(event) {
    // Prevents form from submitting / Prevents form from reloading;
    event.preventDefault();

    // Check if input is empty
    if (toDoInput.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    // Create new todo object
    const newTodo = {
        id: randomUUID(), // Using randomUUID() function to generate unique IDs
        name: toDoInput.value,
        time: new Date().toLocaleString(),
        completed: false
    };

    // Push todo to array
    todos.push(newTodo);

    // Save to local storage
    savelocal();

    // Render todo
    renderTodo(newTodo);

    // Clear input
    toDoInput.value = '';
}
function renderTodo(todo) {
    // ToDo DIV;
    const toDoDiv = document.createElement("div");
    toDoDiv.dataset.id = todo.id;
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);

    // Create LI
    const newToDo = document.createElement('li');
    newToDo.innerText = todo.name;
    newToDo.classList.add('todo-item');
    toDoDiv.appendChild(newToDo);

    // Check btn;
    const checked = document.createElement('button');
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add('check-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(checked);
    // Delete btn;
    const deleted = document.createElement('button');
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add('delete-btn', `${savedTheme}-button`);
    toDoDiv.appendChild(deleted);

    // Append to list;
    toDoList.appendChild(toDoDiv);
}
function deletecheck(event) {
    const item = event.target;
    const todoDiv = item.parentElement;

    if (item.classList.contains('delete-btn')) {
        const todoIndex = Array.from(toDoList.children).indexOf(todoDiv);
        todos.splice(todoIndex, 1);
        todoDiv.remove();
        savelocal();
    }

    if (item.classList.contains('check-btn')) {
        const todoIndex = Array.from(toDoList.children).indexOf(todoDiv);
        todos[todoIndex].completed = !todos[todoIndex].completed;
        todoDiv.classList.toggle('completed');
        savelocal();
    }
}

// Saving to local storage
function savelocal() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        renderTodo(todo);
    });
}
function removeLocalTodos(todoIndex) {
    todos.splice(todoIndex, 1);
    savelocal();
}
// Function to change the theme
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');

    document.body.className = color;
    // Change blinking cursor for darker theme
    if (color === 'darker') {
        document.getElementById('title').classList.add('darker-title');
    } else {
        document.getElementById('title').classList.remove('darker-title');
    }
    // Change buttons color according to their type
    document.querySelectorAll('button').forEach(button => {
        button.classList.remove('standard-button', 'darker-button');
        button.classList.add(`${color}-button`);
    });
}

// Function to generate a unique id for todo items
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to filter tasks
function showAllTasks() {
    const allTasks = document.querySelectorAll('.todo');
    allTasks.forEach(task => {
        task.style.display = 'flex';
    });
}
function showCompletedTasks() {
    const allTasks = document.querySelectorAll('.todo');
    allTasks.forEach(task => {
        if (task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}
function showActiveTasks() {
    const allTasks = document.querySelectorAll('.todo');
    allTasks.forEach(task => {
        if (!task.classList.contains('completed')) {
            task.style.display = 'flex';
        } else {
            task.style.display = 'none';
        }
    });
}
