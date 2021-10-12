// OM Murugan Thunai

// importing the reusable objeccts from TaskManagerclass.js file
import { TaskCardObjectList, TaskManager_Class } from "./taskmanagerclass.js";

// declaring variables here for cantainer and class object

const cardSection = document.querySelectorAll("#m-container");

// creating object for TaskManager_Class
let myTaskCardList = new TaskManager_Class(cardSection, 0);
//event for document loading and unloading
document.body.onunload = myUnLoadFunction;
document.body.onload = myLoadFunction;

// Function to get a formatted date based for the parameter being passed
function getFormattedDate(p1) {
  let date;
  if (p1 === "today") {
    date = new Date();
  } else {
    date = new Date(p1);
  }
  let dd = date.getDate(); // for day
  let mm = date.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  let yyyy = date.getFullYear(); // for year
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (p1 === "today") {
    date = yyyy + "-" + mm + "-" + dd;
  } else {
    date = dd + "/" + mm + "/" + yyyy;
  }
  return date;
}
//function to add events for all elements in the document
function myAddEvents() {
  let plusIcon = document.querySelector("#plus-icon");
  let formCancelBtn = document.querySelector("#form-cancel-btn");
  let formSaveBtn = document.querySelector("#form-save-btn");
  let formRejectBtn = document.querySelector("#form-reset-btn");
  plusIcon.addEventListener("click", myAddOpenForm);
  formCancelBtn.addEventListener("click", myCloseForm);
  formSaveBtn.addEventListener("click", myValidateForm);
  formRejectBtn.addEventListener("click", myClearForm);
  //creating a click event for all the elements within the card overall main conatiner
  cardSection.forEach((btn) => {
    btn.addEventListener("click", deleditStatus);
  });
}
//function for capturing which button (delete, edit & status) is clicked within the cards  and  take appropriate action
function deleditStatus(event) {
  // for delete button
  if (event.target.getAttribute("class") === "card-icon-img-del") {
    const deleteId = event.target.getAttribute("data-id");
    myTaskCardList.deleteElement(deleteId);
  }
  // for edit button
  if (event.target.getAttribute("class") === "card-icon-img-edit") {
    const editId = event.target.getAttribute("data-id");
    myTaskCardList.editElement(editId);
  }
  // for status button
  if (event.target.getAttribute("class") === "card-icon-img-status") {
    const doneId = event.target.getAttribute("data-id");
    myTaskCardList.done_undone(doneId);
  }
}
// function to invoke the add new form
function myAddOpenForm() {
  myOpenForm("Add");
}
// function to validate all input values from the task form  //  add form action - 2
function myValidateForm() {
  const TaskName = document.querySelector("#taskname");
  const TaskNameErr = document.querySelector("#tname-err");
  const TaskDesc = document.querySelector("#taskdescription");
  const TaskDescErr = document.querySelector("#desc-err");
  const assignedTo = document.querySelector("#assignedto");
  const assignedToErr = document.querySelector("#assignto-err");
  const DueDate = document.querySelector("#duedate");
  const DueDateErr = document.querySelector("#ddate-err");
  const dateArr = DueDate.value.split("-");
  let errorCount = 0;

  if (TaskName.value.trim() === "") {
    TaskNameErr.innerText = "    Invalid Task Name..";
    TaskName.style.border = "1px solid red";
    errorCount++;
  } else {
    TaskNameErr.innerText = "";
    TaskName.style.border = "2px solid green";
  }
  if (DueDate.value.trim() === "") {
    DueDateErr.innerText = "    Invalid Due-Date..";
    DueDate.style.border = "1px solid red";
    errorCount++;
  } else {
    DueDateErr.innerText = "";
    DueDate.style.border = "2px solid green";
  }
  if (assignedTo.value.trim() === "") {
    assignedToErr.innerText = "    Invalid Name..";
    assignedTo.style.border = "1px solid red";
    errorCount++;
  } else {
    assignedToErr.innerText = "";
    assignedTo.style.border = "2px solid green";
  }
  if (TaskDesc.value.trim() === "") {
    TaskDescErr.innerText = "    Invalid Description..";
    TaskDesc.style.border = "1px solid red";
    errorCount++;
  } else {
    TaskDescErr.innerText = "";
    TaskDesc.style.border = "2px solid green";
  }
  // if validation fails for even 1 element it will return false and remain in form else will call addtask function
  if (errorCount > 0) {
    errorCount = 0;
    return false;
  } else {
    myAddTask();
  }
}
// add form action - 1
function myOpenForm(p1) {
  document.getElementById("m-container").style.display = "none";
  document.getElementById("Form-modal").style.display = "block";
  myClearForm(p1);
}

function myCloseForm() {
  document.getElementById("Form-modal").style.display = "none";
  document.getElementById("m-container").style.display = "flex";
}
// clears the values for form elements when this function is called

function myClearForm(p1) {
  document
    .querySelector("#duedate")
    .setAttribute("min", getFormattedDate("today"));
  document.querySelector("#taskname").value = "";
  document.querySelector("#taskname").style.border = "none";
  document.querySelector("#taskdescription").value = "";
  document.querySelector("#taskdescription").style.border = "none";
  document.querySelector("#assignedto").value = "";
  document.querySelector("#assignedto").style.border = "none";
  document.querySelector("#duedate").value = "";
  document.querySelector("#duedate").style.border = "none";
  document.querySelector("#add-edit").value = "";
  document.querySelector("#edit-parent-id").value = "";
  document.querySelector("#taskstatus").value = "To Do";
  document.querySelector("#taskstatus").style.border = "none";
  document.querySelector("#tname-err").innerText = "";
  document.querySelector("#desc-err").innerText = "";
  document.querySelector("#assignto-err").innerText = "";
  document.querySelector("#ddate-err").innerText = "";

  //changes the form title as per edit or add form
  if (p1 === "Add") {
    document.querySelector("#add-edit").value = "A";
    document.querySelector("#form-header").innerHTML = "Add Task Details";
  } else if (p1 === "Edit") {
    document.querySelector("#add-edit").value = "E";
    document.querySelector("#form-header").innerHTML = "Edit Task Details";
  }
}
// function to add or update the card values  // add form  action - 3
function myAddTask() {
  const addEdit = document.querySelector("#add-edit").value;
  if (addEdit === "A") {
    myTaskCardList.addElement(); //  add form action - 4
    myClearForm("Add");
  } else {
    myTaskCardList.updateElement();
  }

  myCloseForm();
}

// Function being called when the browser window closes or refreshed to save data into loacl storage
function myUnLoadFunction() {
  const myJSON = JSON.stringify(TaskCardObjectList);
  localStorage.setItem("testJSON", myJSON);
}

// function being called when the browser is loaded or refreshed to retrieve data from local storage into the respective object
function myLoadFunction() {
  let TaskCardArr = localStorage.getItem("testJSON");
  let TaskCardObjectList1 = JSON.parse(TaskCardArr);
  Array.prototype.push.apply(TaskCardObjectList, TaskCardObjectList1);
  myAddEvents();
  myTaskCardList.render();
}
// to export shared function to be avilable for other js files
export { myTaskCardList, myOpenForm, getFormattedDate };
