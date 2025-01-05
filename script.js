let pendingTasks = [];
let completedTasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const task = {
            text: taskText,
            dateAdded: new Date(),
        };
        pendingTasks.push(task);
        taskInput.value = ""; 
        displayTasks();
    }
}

function markComplete(index) {
    const task = pendingTasks.splice(index, 1)[0];
    task.completed = new Date();
    completedTasks.push(task);
    displayTasks();
}

function deleteTask(type, index) {
    if (type === "pending") {
        pendingTasks.splice(index, 1);
    } else {
        completedTasks.splice(index, 1);
    }
    displayTasks();
}

function editTask(type, index) {
    const newTaskText = prompt("Edit task:", type === "pending" ? pendingTasks[index].text : completedTasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        if (type === "pending") {
            pendingTasks[index].text = newTaskText;
        } else {
            completedTasks[index].text = newTaskText;
        }
        displayTasks();
    }
}
function displayTasks() {
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");

    // Clear the lists before redisplaying
    pendingTasksList.innerHTML = "";
    completedTasksList.innerHTML = "";

    // Display Pending Tasks
    pendingTasks.forEach((task, index) => {
        const markCompleteButton = document.createElement("button");
        markCompleteButton.textContent = "Complete";
        markCompleteButton.classList.add("complete");
        markCompleteButton.onclick = () => markComplete(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteTask("pending", index);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.onclick = () => editTask("pending", index);

        const li = createTaskItem(task, [markCompleteButton, deleteButton, editButton], false);
        pendingTasksList.appendChild(li);
    });

    // Display Completed Tasks
    completedTasks.forEach((task, index) => {
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.onclick = () => deleteTask("completed", index);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit");
        editButton.onclick = () => editTask("completed", index);

        const li = createTaskItem(task, [deleteButton, editButton], true);
        li.classList.add("complete");
        completedTasksList.appendChild(li);
    });
}
function createTaskItem(task, buttons, isCompleted) {
    const li = document.createElement("li");

    // Task Content Container
    const taskContent = document.createElement("div");
    taskContent.className = "task-content";

    // Task Text
    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    // Date and Time
    const taskDate = document.createElement("small");
    taskDate.textContent = isCompleted 
        ? `(Completed: ${task.completed.toLocaleString()})` 
        : `(Added: ${task.dateAdded.toLocaleString()})`;
    taskDate.style.display = "block"; // Ensures date appears below text

    taskContent.appendChild(taskText);
    taskContent.appendChild(taskDate);

    // Task Buttons
    const taskButtons = document.createElement("div");
    taskButtons.className = "task-buttons";
    buttons.forEach((button) => taskButtons.appendChild(button));

    li.appendChild(taskContent);
    li.appendChild(taskButtons);

    return li;
}
