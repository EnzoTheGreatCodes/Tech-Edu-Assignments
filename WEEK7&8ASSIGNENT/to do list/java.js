const todoInput = document.getElementById('todoinput');
const submitButton = document.getElementById('submition');
const todoList = document.getElementById('todolist');

function addTask() {
    const task = todoInput.value.trim();

    if (task === '') {
        return;
    }

    const listItem = document.createElement('div');
    listItem.classList.add('todo-item');
    listItem.innerHTML = `
        <span>${task}</span>
        <button class="delete-button" type="button">Delete</button>
    `;

    todoList.appendChild(listItem);
    todoInput.value = '';
    todoInput.focus();
}

submitButton.addEventListener('click', addTask);

todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        event.target.closest('.todo-item').remove();
    }
});