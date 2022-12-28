/* <div class="list-card">
  <button class="card-button-complete">V</button>
  <div class="card-text-container">TEXT</div>
  <span class="date">19.12.2022</span>
  <button class="date-remove-card">X</button>
</div>; */

const startButton = document.querySelector(".home-screen__start");

startButton.addEventListener("click", () => {
  const homeScreen = document.getElementById("home-screen");
  const toDoTitle = document.querySelector(".home-screen__title");
  homeScreen.classList.add("translate");
  toDoTitle.classList.add("--title_top");
  console.log("11");
});

const todoList = document.querySelector(".todo__list");
const buttonAdd = document.querySelector(".buttons__add");
const allTasks = document.getElementById("all");
let completeTasks = document.getElementById("complete");

const showAll = document.querySelector(".todo-header__show-all");
const showComplete = document.querySelector(".todo-header__show-completed");
const searchBtn = document.querySelector(".todo-header__search-btn");

const buttonComplete = document.getElementsByClassName(".card-button-complete");
const buttonDelete = document.querySelectorAll(".date-remove-card");
const removeButton = document.querySelector(".buttons__delete");
const cardEl = document.getElementsByClassName(".list-card");
const listCards = document.querySelector(".todo__list");

let count = 1;
let arrayOfButtons = [];
let tasks = [];
let tasksContent = [];

showComplete.addEventListener("click", () => {
  const cardEl = document.querySelectorAll(".list-card");

  for (let card of cardEl) {
    let arrOfClasess = card.getAttribute("class").split(" ");
    if (arrOfClasess[1] == null) {
      card.style.display = "none";
    }
  }

  completeTasks.textContent = completeCheck();
  allTasks.textContent = allTaskSum();
});

showAll.addEventListener("click", () => {
  const cardEl = document.querySelectorAll(".list-card");

  for (let card of cardEl) {
    card.style.display = "flex";
  }

  completeTasks.textContent = completeCheck();
  allTasks.textContent = allTaskSum();
});

searchBtn.addEventListener("click", () => {
  const searchPlace = document.getElementById("search");
  const cardEl = document.querySelectorAll(".list-card");

  for (let i = 0; i < cardEl.length; i++) {
    console.log(searchPlace.value);
    console.log(tasksContent[i]);
    if (tasksContent[i].toLowerCase() != searchPlace.value.toLowerCase()) {
      cardEl[i].style.display = "none";
    } else {
      cardEl[i].style.display = "flex";
    }
  }
});

/* const dialog = document.querySelector(".dialog");
let isDeleteTask = false;
const dialodYesButton = documen.querySelector(".buttons__yes");
const dialodNoButton = documen.querySelector(".buttons__no");

dialodYesButton.addEventListener("click", () => {
  isDeleteTask = true;
  dialog.close();
});

dialodNoButton.addEventListener("click", () => {
  dialog.close();
}); */

function createNewCard(str, n) {
  const card = document.createElement("div");
  card.classList.add("list-card");
  card.setAttribute("id", `div-${n}`);

  card.append(cardCompleteButton(n));
  card.append(cardTextTask(str));
  card.append(cardDateBlock());
  card.append(cardDeleteButton(n));

  return card;
}

function cardCompleteButton(n) {
  const cardCompleteButton = document.createElement("button");
  const cardCompleteButtonImg = document.createElement("img");

  cardCompleteButtonImg.setAttribute("src", "./images/check-svgrepo-com.svg");
  cardCompleteButton.append(cardCompleteButtonImg);

  cardCompleteButton.classList.add("card-button-complete");
  cardCompleteButton.setAttribute("id", `button-${n}`);
  cardCompleteButton.setAttribute("onclick", `addComplete(${n})`);

  return cardCompleteButton;
}

function cardTextTask(str) {
  const cardTextTask = document.createElement("div");
  const p = document.createElement("p");

  cardTextTask.classList.add("card-text-container");
  p.innerText = str;

  cardTextTask.append(p);

  return cardTextTask;
}

function cardDateBlock() {
  const cardDateBlock = document.createElement("span");
  cardDateBlock.classList.add("date");
  cardDateBlock.innerText = _computedDate();

  return cardDateBlock;
}

function cardDeleteButton(n) {
  const cardDeleteButton = document.createElement("button");
  const cardDeleteButtonImg = document.createElement("img");

  cardDeleteButtonImg.setAttribute("src", "./images/remove-svgrepo-com.svg");
  cardDeleteButton.append(cardDeleteButtonImg);

  cardDeleteButton.classList.add("date-remove-card");
  cardDeleteButton.setAttribute("onclick", `randRemove(${n})`);

  return cardDeleteButton;
}

buttonAdd.addEventListener("click", () => {
  let textTask = document.querySelector(".buttons__input");

  if (!Boolean(textTask.value.trim())) {
    alert("please, write text!");
    return null;
  }

  tasks.push(createNewCard(textTask.value, count));
  todoList.append(createNewCard(textTask.value, count));

  tasksContent.push(textTask.value);
  //console.log(textTask);
  textTask.value = "";
  //console.log(textTask);

  //renderTasksLayout();
  completeTasks.textContent = completeCheck();
  allTasks.textContent = allTaskSum();

  count++;
});

function renderTasksLayout() {
  if (tasks.length) {
    for (let i = 0; i < tasks.length; i++) {
      todoList.append(tasks[i]);
    }
  }
}

removeButton.addEventListener("click", () => {
  const cardEl = document.querySelectorAll(".list-card");

  //renderTasksLayout();
  for (let card of cardEl) {
    card.remove();
  }
  tasks = [];
  allTasks.textContent = 0;
  count = 0;

  completeTasks.textContent = completeCheck();
  allTasks.textContent = allTaskSum();

  console.log(tasks);
});

function randRemove(n) {
  let randSelect = document.getElementById(`div-${n}`);
  const cardEl = document.querySelectorAll(".list-card");
  //let che = document.querySelectorAll(".complete");

  for (let card of cardEl) {
    let arrOfClasess = card.getAttribute("class").split(" ");
    if (arrOfClasess[1] == "complete") {
      completeTasks.textContent--;
    }
  }

  completeTasks.textContent - 1;

  Number(allTasks.textContent);
  allTasks.textContent--;

  randSelect.remove();

  if (cardEl.length >= 1) {
    count = 1;
  }

  completeTasks.textContent = completeCheck();
  allTasks.textContent = allTaskSum();
}

function addComplete(n) {
  const cardCheck = document.getElementById(`div-${n}`);

  cardCheck.classList.toggle("complete");
  completeTasks.textContent = completeCheck();
}

function _computedDate() {
  const date = new Date();
  const formattedDate = `${_convertTime(date.getHours())}:${_convertTime(
    date.getMinutes(),
  )}:${_convertTime(date.getSeconds())}`;
  return formattedDate;
}

function _convertTime(time) {
  if (time < 10) {
    return `0${time}`;
  }
  return time;
}

function completeCheck() {
  const cardEl = document.querySelectorAll(".list-card");
  let a = 0;

  for (let card of cardEl) {
    let arrOfClasess = card.getAttribute("class").split(" ");
    if (arrOfClasess[1] == "complete") {
      a++;
    }
  }

  return a;
}

function allTaskSum() {
  return document.querySelectorAll(".list-card").length;
}
