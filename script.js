// simple todo list using localStorage

document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addBtn = document.getElementById('add-btn');
    const pendingList = document.getElementById('pending-list');
    const completedList = document.getElementById('completed-list');

    // load existing tasks
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    renderTasks();

    addBtn.addEventListener('click', () => {
        const text = newTaskInput.value.trim();
        if (text === '') return;
        const task = {
            id: Date.now(),
            text,
            completed: false,
            addedAt: new Date().toISOString()
        };
        tasks.push(task);
        saveAndRender();
        newTaskInput.value = '';
    });

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.id = task.id;

        const span = document.createElement('span');
        span.textContent = task.text;
        li.appendChild(span);

        const time = document.createElement('small');
        time.textContent = new Date(task.addedAt).toLocaleString();
        time.style.marginLeft = '8px';
        time.style.fontSize = '10px';
        li.appendChild(time);

        const btnContainer = document.createElement('div');

        if (!task.completed) {
            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = 'Complete';
            completeBtn.addEventListener('click', () => {
                task.completed = true;
                saveAndRender();
            });
            btnContainer.appendChild(completeBtn);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveAndRender();
        });
        btnContainer.appendChild(deleteBtn);

        li.appendChild(btnContainer);
        return li;
    }

    function renderTasks() {
        pendingList.innerHTML = '';
        completedList.innerHTML = '';
        tasks.forEach(task => {
            const el = createTaskElement(task);
            if (task.completed) {
                completedList.appendChild(el);
            } else {
                pendingList.appendChild(el);
            }
        });
    }

    function saveAndRender() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    }
});