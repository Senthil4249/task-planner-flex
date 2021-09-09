// OM Murugan Thunai

function myOpenForm(p1) {
  document.getElementById("m-container").style.display = "none";
  document.getElementById("Form-modal").style.display = "block";
  myClearForm(p1);
}

function myCloseForm() {
  document.getElementById("Form-modal").style.display = "none";
  document.getElementById("m-container").style.display = "flex";
}

function myRemoveTask(TaskId) {
  let result = confirm("Are you Sure to delete this task?");
  if (result) {
    elem = document.getElementById(TaskId.id);
    let PtId = elem.parentNode;
    PtId.remove();
  }
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
  // Get Form Values
  const strTaskNameValue = document.querySelector("#taskname").value;
  const strDescriptionValue = document.querySelector("#taskdescription").value;
  const strAssignedToValue = document.querySelector("#assignedto").value;
  const strDueDateValue = document.querySelector("#duedate").value;
  const strStatusValue = document.querySelector("#taskstatus").value;

  if (strTaskNameValue.trim()) {
    let uID = Date.now().toString();
    let mainCard = document.createElement("div");

    mainCard.id = "Task-" + uID;
    mainCard.className = "flex-card";

    let img1 = document.createElement("img");
    let img2 = document.createElement("img");

    img1.src = "images/pencil-square.svg";
    img1.alt = "Edit Icon";
    img1.title = "Edit Task";
    img1.className = "card-icon-img";
    img1.id = "IME-" + Date.now().toString();
    img1.setAttribute("onclick", "myEditTask(this)");

    img2.src = "images/trash.svg";
    img2.alt = "Delete Icon";
    img2.title = "Delete Task";
    img2.className = "card-icon-img";
    img2.setAttribute("onclick", "myRemoveTask(this)");
    img2.id = "IMD-" + Date.now().toString();

    let cardText = document.createElement("div");
    cardText.className = "card-text";

    let h51L = document.createElement("h5");
    let h52L = document.createElement("h5");
    let h53L = document.createElement("h5");
    let h54L = document.createElement("h5");
    let h55L = document.createElement("h5");
    let tnameV = document.createElement("p");
    let tdescV = document.createElement("p");
    let assignedToV = document.createElement("p");
    let duedateV = document.createElement("p");
    let statusV = document.createElement("p");

    let strTaskNameLabel = "Task Name: ";
    let strDescriptionLabel = "Description: ";
    let strAssignedToLabel = "Assigned To: ";
    let strDueDateLabel = "Due Date: ";
    let strStatusLabel = "Status: ";

    // Adding Label elements
    h51L.textContent = strTaskNameLabel;
    h52L.textContent = strDescriptionLabel;
    h53L.textContent = strAssignedToLabel;
    h54L.textContent = strDueDateLabel;
    h55L.textContent = strStatusLabel;

    // Adding Values from the Form Elements
    tnameV.textContent = strTaskNameValue;
    tdescV.textContent = strDescriptionValue;
    assignedToV.textContent = strAssignedToValue;
    duedateV.textContent = strDueDateValue;
    statusV.textContent = strStatusValue;

    // Adding the Card-Text Structure into the HTML page
    cardText.appendChild(h51L);
    cardText.appendChild(tnameV);
    cardText.appendChild(h52L);
    cardText.appendChild(tdescV);
    cardText.appendChild(h53L);
    cardText.appendChild(assignedToV);
    cardText.appendChild(h54L);
    cardText.appendChild(duedateV);
    cardText.appendChild(h55L);
    cardText.appendChild(statusV);

    mainCard.appendChild(img1);
    mainCard.appendChild(img2);
    mainCard.appendChild(cardText);

    let opType = document.querySelector("#add-edit").value;
    let editParentId = document.querySelector("#edit-parent-id").value;
    if (opType === "A") {
      document.getElementById("m-container").appendChild(mainCard);
    } else {
      let parentEditNode = document.getElementById(editParentId);
      document
        .getElementById("m-container")
        .replaceChild(mainCard, parentEditNode);
    }
  }
  myCloseForm();
}

// Edit Task Function Starts here
function myEditTask(edid) {
  elem = document.getElementById(edid.id);
  let parentNodeId = elem.parentNode.id;

  let myStr = elem.parentNode.getElementsByTagName("p");
  let myArray = myStr;

  myOpenForm("Edit");
  document.querySelector("#taskname").value = myArray[0].innerHTML;
  document.querySelector("#taskdescription").value = myArray[1].innerHTML;
  document.querySelector("#assignedto").value = myArray[2].innerHTML;
  document.querySelector("#duedate").value = myArray[3].innerHTML;
  document.querySelector("#taskstatus").value = myArray[4].innerHTML;
  document.querySelector("#edit-parent-id").value = parentNodeId;
}
