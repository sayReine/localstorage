let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = null;

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card";
    taskCard.style.background = task.bg;

    taskCard.innerHTML = `
      <h3>${task.name}</h3>
      <p><strong>Type:</strong> ${task.type}</p>
      <p>${task.desc}</p>
      <div class="task-actions">
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskCard);
  });
}

function clearForm() {
  document.getElementById("task-form").reset();
  editIndex = null;
}

document.getElementById("task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("task-name").value;
  const type = document.getElementById("task-type").value;
  const desc = document.getElementById("task-desc").value;
  const bg = document.getElementById("task-bg").value;

  const newTask = { name, type, desc, bg };

  if (editIndex === null) {
    tasks.push(newTask);
  } else {
    tasks[editIndex] = newTask;
  }

  saveToLocalStorage();
  renderTasks();
  clearForm();
});

function editTask(index) {
  const task = tasks[index];
  document.getElementById("task-name").value = task.name;
  document.getElementById("task-type").value = task.type;
  document.getElementById("task-desc").value = task.desc;
  document.getElementById("task-bg").value = task.bg;
  editIndex = index;
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveToLocalStorage();
  renderTasks();
}

document.getElementById("clear-all").addEventListener("click", () => {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    saveToLocalStorage();
    renderTasks();
  }
});

// Load tasks on page load
renderTasks();
