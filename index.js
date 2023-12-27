function getNewTask() {
  let newTask = document.querySelector('.todo:last-child').cloneNode(true);
  newTask.querySelector('input[type="text"]').value = '';
  newTask.querySelector('input[type="text"]').removeAttribute('readonly');
  newTask.querySelector('input[type="checkbox"]').removeAttribute('checked');
  newTask.querySelector('input[type="checkbox"]').removeAttribute('disabled');
  return newTask;
}

window.addEventListener('load', function () {
  listenNewTasks();
  listenTaskChanges();
  listenDeleteTasks();
  loadTasks();
})

function listenNewTasks() {
  document.querySelector('.todo:last-child').addEventListener('click', function() {
    let newTask = getNewTask();
    this.parentNode.insertBefore(newTask, this);
    document.querySelector('.todo:nth-last-child(2) input[type="text"]').focus();
  });
  document.querySelector('.todo').addEventListener('keyup', function(e) {
    if (e.code === "Enter") {
      let newTask = getNewTask();
      this.parentNode.insertBefore(newTask, this.nextSibling);
      newTask.focus();
    }
  });
}

function listenTaskChanges() {
  document.addEventListener('change', function(event) {
    if (event.target.tagName === 'INPUT') {
      saveTasks();
    }
  });
}

function listenDeleteTasks() {
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete') && !event.target.parentNode.querySelector('input[type="checkbox"]').disabled) {
      event.target.parentNode.remove();
      saveTasks();
    }
  });
}

function saveTasks() {
  let tasks = document.querySelectorAll('.todo');
  let tasksArray = [];
  tasks.forEach(function(task) {
    if (task.querySelector('input[type="text"]').value) {
      tasksArray.push({
        task: task.querySelector('input[type="text"]').value,
        completed: task.querySelector('input[type="checkbox"]').checked
      });
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks) {
    tasks.forEach(function(task) {
      let newTask = getNewTask();
      newTask.querySelector('input[type="text"]').value = task.task;
      newTask.querySelector('input[type="checkbox"]').checked = task.completed;
      
      document.querySelector('.todo:last-child').parentNode.insertBefore(newTask, document.querySelector('.todo:last-child'));
    });
  }
}