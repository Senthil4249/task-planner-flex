// OM Murugan Thunai

// importing the reusable objeccts from TaskManagerclass.js file
import { TaskCardObjectList, TaskManager_Class } from "./taskmanagerclass.js";

// importing the reusable objeccts from Tools.js file
import { temperatureConverter, calculatorDisplay } from "./tools.js";

// declaring variables here for cantainer and class object

const cardSection = document.querySelectorAll("#m-container");

// creating object for TaskManager_Class
let myTaskCardList = new TaskManager_Class(cardSection, 0);
//event for document loading and unloading
document.body.onunload = myUnLoadFunction;
document.body.onload = myLoadFunction;

// drag and drop code section starts here
/* draggable element */

function dragStart(e) {
  if (e.target.classList.contains("flex-card")) {
    e.dataTransfer.setData("drag-id", e.target.id);
    setTimeout(() => {
      e.target.style.display = "none";
    }, 30);
  }
}

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragLeave(e) {
  e.target.classList.remove("drag-over");
}

function drop(e) {
  e.target.classList.remove("drag-over");

  // get the draggable element
  const id = e.dataTransfer.getData("drag-id");
  const selectedCardIndex = TaskCardObjectList.findIndex(
    (card) => card.id == id
  );
  // change the status and call render function
  if (e.target.getAttribute("class") === "my-container-td") {
    TaskCardObjectList[selectedCardIndex].TaskStatusV = "To Do";
    TaskCardObjectList[selectedCardIndex].TaskIsDoneV = false;
    myTaskCardList.render();
  } else if (e.target.getAttribute("class") === "my-container-ip") {
    TaskCardObjectList[selectedCardIndex].TaskStatusV = "In-Progress";
    TaskCardObjectList[selectedCardIndex].TaskIsDoneV = false;
    myTaskCardList.render();
  } else if (e.target.getAttribute("class") === "my-container-rv") {
    TaskCardObjectList[selectedCardIndex].TaskStatusV = "Review";
    TaskCardObjectList[selectedCardIndex].TaskIsDoneV = false;
    myTaskCardList.render();
  } else if (e.target.getAttribute("class") === "my-container-dn") {
    TaskCardObjectList[selectedCardIndex].TaskStatusV = "Done";
    TaskCardObjectList[selectedCardIndex].TaskIsDoneV = true;
    myTaskCardList.render();
  }
}

// drag and drop section code ends here

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myToolFunction() {
  document.getElementById("myToolsDropdown").classList.toggle("show");
}

function myConvertorOpenForm() {
  document.querySelector("#Temperature-conversion").style.display = "block";
  let inputFahrenheit = document.querySelector("#inputFahrenheit");
  let inputCelcius = document.querySelector("#inputCelcius");
  let inputKelvin = document.querySelector("#inputKelvin");
  inputCelcius.value = "";
  inputFahrenheit.value = "";
  inputKelvin.value = "";
}

// calculator function open form
function myCalculatorOpenForm() {
  document.querySelector("#calculatorForm").style.display = "block";
  document.querySelector("#calcDisplayResult").value = "0";
}

function myConvertorCloseForm() {
  document.querySelector("#Temperature-conversion").style.display = "none";
}
// my calculator close form

function myCalculatorCloseForm() {
  document.querySelector("#calculatorForm").style.display = "none";
}
// convertor form close button
let convertorFormCloseBtn = document.querySelector(".close-form-btn");
convertorFormCloseBtn.addEventListener("click", myConvertorCloseForm);
//-------------------
let calcCloseFormBtn = document.querySelector("#calcCloseFormBtn");
calcCloseFormBtn.addEventListener("click", myCalculatorCloseForm);

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".tools-icon-img")) {
    let myToolsDropdown = document.getElementById("myToolsDropdown");
    if (myToolsDropdown.classList.contains("show")) {
      myToolsDropdown.classList.remove("show");
    }
  }
};

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
  let toolsiconimgid = document.querySelector("#tools-icon-img-id");
  let Convertorlinkid = document.querySelector("#convertor-link-id");
  let calculatorLinkId = document.querySelector("#calculatorLinkId");
  let inputFahrenheit = document.querySelector("#inputFahrenheit");
  let inputCelcius = document.querySelector("#inputCelcius");
  let inputKelvin = document.querySelector("#inputKelvin");

  plusIcon.addEventListener("click", myAddOpenForm);
  formCancelBtn.addEventListener("click", myCloseForm);
  formSaveBtn.addEventListener("click", myValidateForm);
  formRejectBtn.addEventListener("click", myClearForm);
  toolsiconimgid.addEventListener("click", myToolFunction);
  Convertorlinkid.addEventListener("click", myConvertorOpenForm);
  calculatorLinkId.addEventListener("click", myCalculatorOpenForm);
  inputKelvin.addEventListener("change", temperatureConverter);
  inputKelvin.addEventListener("input", temperatureConverter);
  inputCelcius.addEventListener("change", temperatureConverter);
  inputCelcius.addEventListener("input", temperatureConverter);
  inputFahrenheit.addEventListener("change", temperatureConverter);
  inputFahrenheit.addEventListener("input", temperatureConverter);
  //creating a click event for all the elements within the card overall main conatiner
  cardSection.forEach((btn) => {
    btn.addEventListener("click", deleditStatus);
  });
  const itemList = document.querySelectorAll(".list-group");
  itemList.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
  });
  // calculator button event list
  const calcBtnList = document.querySelectorAll(".calculatorBtn");
  calcBtnList.forEach((item) => {
    item.addEventListener("click", calculatorDisplay);
  });
  //---------------------------------

  /* drop targets */
  const tdBox = document.querySelector(".my-container-td");
  const ipBox = document.querySelector(".my-container-ip");
  const rvBox = document.querySelector(".my-container-rv");
  const dnBox = document.querySelector(".my-container-dn");

  tdBox.addEventListener("dragenter", dragEnter);
  tdBox.addEventListener("dragover", dragOver);
  tdBox.addEventListener("dragleave", dragLeave);
  tdBox.addEventListener("drop", drop);
  ipBox.addEventListener("dragenter", dragEnter);
  ipBox.addEventListener("dragover", dragOver);
  ipBox.addEventListener("dragleave", dragLeave);
  ipBox.addEventListener("drop", drop);
  rvBox.addEventListener("dragenter", dragEnter);
  rvBox.addEventListener("dragover", dragOver);
  rvBox.addEventListener("dragleave", dragLeave);
  rvBox.addEventListener("drop", drop);
  dnBox.addEventListener("dragenter", dragEnter);
  dnBox.addEventListener("dragover", dragOver);
  dnBox.addEventListener("dragleave", dragLeave);
  dnBox.addEventListener("drop", drop);
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
