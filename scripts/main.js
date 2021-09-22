// OM Murugan Thunai

import { TaskCardObjectList, TaskManager_Class } from "./taskmanagerclass.js";

let btnCollection = document.querySelectorAll(".left-button");
const cardSection = document.querySelector("#m-container");
let myTaskCardList = new TaskManager_Class(cardSection);
// document.querySelector("#confirm-id").value = false;
document.body.onunload = myUnLoadFunction;
document.body.onload = myLoadFunction;

function myAddEvents() {
  let plusIcon = document.querySelector("#plus-icon");
  let formCancelBtn = document.querySelector("#form-cancel-btn");
  let formSaveBtn = document.querySelector("#form-save-btn");
  let alertOkBtn = document.querySelector("#alert-ok-btn");
  let alertcancelbtn = document.querySelector("#alert-cancel-btn");
  plusIcon.addEventListener("click", myAddOpenForm);
  formCancelBtn.addEventListener("click", myCloseForm);
  formSaveBtn.addEventListener("click", myValidateForm);
  alertOkBtn.addEventListener("click", myCloseAlert);
  alertcancelbtn.addEventListener("click", myCloseAlert);
  btnCollection.forEach((btn) => {
    btn.addEventListener("click", showTask);
  });
}

function myAddOpenForm() {
  myOpenForm("Add");
}

function myValidateForm() {
  const TaskName = document.querySelector("#taskname").value;
  const TaskDesc = document.querySelector("#taskdescription").value;
  const assignedTo = document.querySelector("#assignedto").value;
  const DueDate = document.querySelector("#duedate").value;
  const dateArr = DueDate.split("-");

  if (TaskName === "") {
    myAlert("Task Name cannot be left blank and must be filled out", "e");
    return false;
  } else if (DueDate === "") {
    myAlert("Due Date cannot be left blank must be filled out", "e");
    return false;
  } else if (dateArr[0] > 2030 || dateArr[0] < 2010) {
    myAlert("Date Value can only be between 01-01-2010 and 31-12-2030", "w");
    return false;
  } else if (assignedTo === "") {
    myAlert("Assigned To cannot be left blank and must be filled out", "e");
    return false;
  } else if (TaskDesc === "") {
    myAlert(
      "Task Description cannot be left blank and must be filled out",
      "e"
    );
    return false;
  }
  myAddTask();
}

function myOpenForm(p1) {
  document.getElementById("m-container").style.display = "none";
  document.getElementById("Form-modal").style.display = "block";
  myClearForm(p1);
}

function myAlert(message, type) {
  document.querySelector("#alert-modal").style.display = "block";
  document.querySelector("#alert-label-id").innerText = message;
  if (type === "e") {
    document.querySelector("#alert-icon").src = "./images/error.jfif";
    document.querySelector("#alert-header").innerText = "Error";
    document.querySelector("#alert-label-id").style.color = "red";
    document.querySelector("#alert-cancel-btn").style.display = "none";
  } else if (type === "w") {
    document.querySelector("#alert-icon").src = "./images/warning_icon.svg";
    document.querySelector("#alert-header").innerText = "Warning";
    document.querySelector("#alert-label-id").style.color = "brown";
    document.querySelector("#alert-cancel-btn").style.display = "none";
  } else if (type === "i") {
    document.querySelector("#alert-icon").src = "./images/info-lg.svg";
    document.querySelector("#alert-header").innerText = "Information";
    document.querySelector("#alert-label-id").style.color = "blue";
    document.querySelector("#alert-cancel-btn").style.display = "none";
  } else {
    document.querySelector("#alert-icon").src =
      "./images/question-mark-icon.jpg";
    document.querySelector("#alert-header").innerText = "";
    document.querySelector("#alert-label-id").style.color = "black";
    document.querySelector("#alert-cancel-btn").style.display = "inline";
  }
}

function myCloseAlert(e) {
  document.getElementById("alert-modal").style.display = "none";
}

function myCloseForm() {
  document.getElementById("Form-modal").style.display = "none";
  document.getElementById("alert-modal").style.display = "none";
  document.getElementById("m-container").style.display = "flex";
}

function myClearForm(p1) {
  document.querySelector("#taskname").value = "";
  document.querySelector("#taskdescription").value = "";
  document.querySelector("#assignedto").value = "";
  document.querySelector("#duedate").value = "";
  document.querySelector("#add-edit").value = "";
  document.querySelector("#edit-parent-id").value = "";
  document.querySelector("#taskstatus").value = "To Do";
  if (p1 === "Add") {
    document.querySelector("#add-edit").value = "A";
    document.querySelector("#form-header").innerHTML = "Add Task Details";
  } else if (p1 === "Edit") {
    document.querySelector("#add-edit").value = "E";
    document.querySelector("#form-header").innerHTML = "Edit Task Details";
  }
}

function myAddTask() {
  const addEdit = document.querySelector("#add-edit").value;

  if (addEdit === "A") {
    myTaskCardList.addElement();
    myClearForm("Add");
  } else {
    myTaskCardList.updateElement();
  }

  myCloseForm();
}

function showTask(obj) {
  for (let i = 0; i < btnCollection.length; i++) {
    if (btnCollection[i].textContent === obj.target.textContent) {
      btnCollection[i].style.backgroundColor = "lightgreen";
    } else {
      btnCollection[i].style.backgroundColor = "";
    }
  }

  let currentButtonText = obj.target.textContent;
  if (obj.target.textContent === "In Progress") {
    currentButtonText = "In-Progress";
  }

  TaskCardObjectList.forEach((item) => {
    if (
      currentButtonText.trim() === item.TaskStatusV.trim() ||
      currentButtonText === "All Task" ||
      currentButtonText === "Reports"
    ) {
      item.TaskVisibility = true;
    } else {
      item.TaskVisibility = false;
    }
  });
  myTaskCardList.render();
}

function myUnLoadFunction() {
  const myJSON = JSON.stringify(TaskCardObjectList);
  localStorage.setItem("testJSON", myJSON);
}

function myLoadFunction() {
  let TaskCardArr = localStorage.getItem("testJSON");
  let TaskCardObjectList1 = JSON.parse(TaskCardArr);
  Array.prototype.push.apply(TaskCardObjectList, TaskCardObjectList1);
  myAddEvents();
  btnCollection[0].style.backgroundColor = "lightgreen";
  TaskCardObjectList.forEach((item) => {
    item.TaskVisibility = true;
  });
  myTaskCardList.render();
}

export { myTaskCardList, myOpenForm };
