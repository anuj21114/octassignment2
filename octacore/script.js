document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-task-form');
    const taskInput = document.getElementById('task-input');
    const tasksContainer = document.getElementById('tasks-container');

    let tasks = [];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now().toString(),
                text: taskText,
                completed: false
            };
            tasks.push(task);
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        tasksContainer.innerHTML = '';
        tasks.forEach(function(task) {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item');
            if (task.completed) {
                taskElement.innerHTML = `
                    <input type="checkbox" class="task-checkbox" checked>
                    <span class="task-text">${task.text}</span>
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                `;
            } else {
                taskElement.innerHTML = `
                    <input type="checkbox" class="task-checkbox">
                    <span class="task-text">${task.text}</span>
                    <button class="edit-btn" data-id="${task.id}">Edit</button>
                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                `;
            }
            tasksContainer.appendChild(taskElement);

            const checkbox = taskElement.querySelector('.task-checkbox');
            checkbox.addEventListener('change', function() {
                task.completed = !task.completed;
                renderTasks();
            });

            const editButton = taskElement.querySelector('.edit-btn');
            editButton.addEventListener('click', function() {
                const newText = prompt('Edit task:', task.text);
                if (newText !== null) {
                    task.text = newText.trim();
                    renderTasks();
                }
            });

            const deleteButton = taskElement.querySelector('.delete-btn');
            deleteButton.addEventListener('click', function() {
                tasks = tasks.filter(function(t) {
                    return t.id !== task.id;
                });
                renderTasks();
            });
        });
    }
});
