const taskWrapper = document.querySelector(`.task-wrapper`);
const taskForm = document.querySelector(`.task-form`);
const inputForm = document.querySelector(`.task-form input`);
const allTask = document.querySelector(`.all-task`);
const taskList = document.querySelector('.task-list');
const filterTasks = document.querySelector('.all-tasks input');
const clearTasks = document.querySelector('.clear-tasks');

//show all loca storeg in dom
if (localStorage.getItem(`tasks`)) {
  let taskHtml = ``;
  const tasksFromStorage = JSON.parse(localStorage.getItem(`tasks`));
  tasksFromStorage.forEach((user) => {
    taskHtml += `<li class="task-item"><span>${user}<i class="delete"></i></span></li>`;
  });
  taskList.innerHTML = taskHtml;
}

//submit form
taskForm.addEventListener(`submit`, function (e) {
  e.preventDefault();
  if (inputForm.value.trim() === ``) {
    window.alert(`pless write in form`);
  } else {
    //local storeg
    let saveTasks = [];
    if (localStorage.getItem(`tasks`)) {
      saveTasks = JSON.parse(localStorage.getItem(`tasks`));
      saveTasks.push(inputForm.value.trim());
      localStorage.setItem(`tasks`, JSON.stringify(saveTasks));
    } else {
      saveTasks.push(inputForm.value.trim());
      localStorage.setItem(`tasks`, JSON.stringify(saveTasks));
    }
    //creat elemnt in ul
    const li = document.createElement(`li`);
    li.classList.add(`task-item`);
    const span = document.createElement(`span`);
    li.appendChild(span);
    const inputValue = document.createTextNode(inputForm.value);
    span.appendChild(inputValue);
    span.innerHTML += `<i class="delete"></i>`;
    taskList.appendChild(li);
    inputForm.value = ``;
  }
});
//clear all buttom

clearTasks.addEventListener(`click`, function () {
  while (taskList.firstElementChild) {
    taskList.removeChild(taskList.firstElementChild);
  }
  filterTasks.value = ``;
  localStorage.removeItem(`tasks`);
});

//btn delet

taskList.addEventListener(`click`, function (e) {
  const text = e.target.parentElement.innerText;
  const tasksFromStorage = JSON.parse(localStorage.getItem(`tasks`));
  const findIndex = tasksFromStorage.findIndex((task) => task === text);
  tasksFromStorage.splice(findIndex, 1);
  localStorage.setItem(`tasks`, JSON.stringify(tasksFromStorage));
  if (e.target.classList.contains(`delete`)) {
    let re = e.target.parentElement.parentElement.remove();
  }
});

//filter task

filterTasks.addEventListener(`keyup`, function () {
  const lists = Array.from(taskList.children);
  lists.forEach(function (list) {
    if (list.textContent.startsWith(filterTasks.value.trim())) {
      list.style.display = `block`;
    } else {
      list.style.display = `none`;
    }
  });
});
