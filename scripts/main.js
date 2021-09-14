// OM Murugan Thunai

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
  } else if (p1 === "Edit") {
    document.querySelector("#add-edit").value = "E";
  }
}

function myAddTask() {
  const addEdit = document.querySelector("#add-edit").value;

  if (addEdit === "A") {
    const cardSection = document.querySelector("#m-container");

    myTaskCardList = new TaskManager_Class(cardSection);

    myTaskCardList.addElement();
    myClearForm("Add");
  } else {
    myTaskCardList.updateElement();
  }

  myCloseForm();
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
  myTaskCardList.render();
}
