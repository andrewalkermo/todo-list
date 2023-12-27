window.addEventListener("load", function () {
  loadTasks();
});

function getNewTask() {
  const newTask = document.createElement("div");
  newTask.classList.add("todo");

  const deleteButton = document.createElement("span");
  deleteButton.classList.add("delete");
  deleteButton.innerHTML = "X";
  deleteButton.addEventListener("click", function () {
    this.parentNode.remove();
    saveTasks();
  });

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("name", "task-completed[]");
  checkbox.addEventListener("change", () => saveTasks());

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("name", "task-description[]");
  input.setAttribute("placeholder", "Nova tarefa");
  input.addEventListener("keyup", function (e) {
    if (e.code === "Enter") {
      const newTask = getNewTask();
      this.parentNode.parentNode.insertBefore(
        newTask,
        this.parentNode.nextSibling
      );
      newTask.querySelector('input[type="text"]').focus();
    }
    saveTasks();
  });

  newTask.appendChild(deleteButton);
  newTask.appendChild(checkbox);
  newTask.appendChild(input);

  return newTask;
}

function saveTasks() {
  const tasks = Array.from(document.querySelectorAll(".todo")).map(function (
    task
  ) {
    return {
      task: task.querySelector('input[type="text"]').value,
      completed: task.querySelector('input[type="checkbox"]').checked,
    };
  });

  if (tasks.length === 0) {
    insertInitialTask();
    return;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null || tasks.length === 0 || typeof tasks === "undefined") {
    insertInitialTask();
    return;
  }

  tasks.forEach(function (task) {
    const newTask = getNewTask();
    newTask.querySelector('input[type="text"]').value = task.task;
    newTask.querySelector('input[type="checkbox"]').checked = task.completed;

    document.querySelector(".todo-list").appendChild(newTask);
  });
}

function insertInitialTask() {
  const newTask = getNewTask();
  document.querySelector(".todo-list").appendChild(newTask);
}
