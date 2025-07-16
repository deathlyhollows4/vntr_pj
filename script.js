let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  setTimeout(() => {
    notification.textContent = "";
  }, 2000);
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      ${task.text}
      <span>
        <button onclick="toggleTask(${index})">✔️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </span>
    `;
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") {
    showNotification("Task cannot be empty");
    return;
  }
  tasks.push({ text, completed: false, addedAt: Date.now() });
  saveTasks();
  renderTasks();
  input.value = "";
  showNotification("Task added");
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
  showNotification("Task deleted");
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
  showNotification("Task updated");
}

function sortTasksAZ() {
  tasks.sort((a, b) => a.text.localeCompare(b.text));
  saveTasks();
  renderTasks();
  showNotification("Sorted A-Z");
}

function sortByTime() {
  tasks.sort((a, b) => a.addedAt - b.addedAt);
  saveTasks();
  renderTasks();
  showNotification("Sorted by time added");
}

renderTasks();
