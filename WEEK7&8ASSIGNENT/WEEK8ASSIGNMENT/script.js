const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addTaskButton = document.getElementById('addTaskBtn');

function addTask() {
    const taskName = taskInput.value.trim();
    if (!taskName) {
        taskInput.focus();
        return;
    }
    const taskHTML = `
        <div class="task">
            <span></span>
            <button type="button">Delete</button>
        </div>
    `;
    const taskTemplate = document.createElement('template');
    taskTemplate.innerHTML = taskHTML;
    taskTemplate.content.querySelector('span').textContent = taskName;

    taskList.appendChild(taskTemplate.content.cloneNode(true));
    taskInput.value = '';
    taskInput.focus();
}
addTaskButton.addEventListener('click',addTask);
taskInput.addEventListener('keydown',(event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

taskList.addEventListener('click',(event) => {
    if (event.target.matches('button')) {
        event.target.parentElement.remove();
    }
});