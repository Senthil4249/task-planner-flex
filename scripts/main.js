// OM Murugan Thunai

let btnCollection = document.querySelectorAll(".left-button");

function myAddEvents() {
  let plusIcon = document.querySelector("#plus-icon");
  let formCancelBtn = document.querySelector("#form-cancel-btn");
  let formSaveBtn = document.querySelector("#form-save-btn");
  plusIcon.addEventListener("click", myAddOpenForm);
  formCancelBtn.addEventListener("click", myCloseForm);
  formSaveBtn.addEventListener("click", myValidateForm);
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
    alert("Task Name must be filled out");
    return false;
  } else if (DueDate === "") {
    alert("Due Date must be filled out");
    return false;
  } else if (dateArr[0] > 2030 || dateArr[0] < 2010) {
    alert("Date Value can only be between 01-01-2010 and 31-12-2030");
    return false;
  } else if (assignedTo === "") {
    alert("Assigned To must be filled out");
    return false;
  } else if (TaskDesc === "") {
    alert("Task Description must be filled out");
    return false;
  }
  myAddTask();
}

function myOpenForm(p1) {
  document.getElementById("m-container").style.display = "none";
  document.getElementById("Form-modal").style.display = "block";
  myClearForm(p1);
}

function myCloseForm() {
  document.getElementById("Form-modal").style.display = "none";
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
  TaskCardObjectList1 = JSON.parse(TaskCardArr);
  Array.prototype.push.apply(TaskCardObjectList, TaskCardObjectList1);
  const cardSection = document.querySelector("#m-container");
  myTaskCardList = new TaskManager_Class(cardSection);
  myAddEvents();
  btnCollection[0].style.backgroundColor = "lightgreen";
  TaskCardObjectList.forEach((item) => {
    item.TaskVisibility = true;
  });
  myTaskCardList.render();
}

document.body.onunload = myUnLoadFunction;
document.body.onload = myLoadFunction;
