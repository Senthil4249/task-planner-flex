// Om Murugan Thunai

let TaskCardObjectList = [];

class TaskManager_Class {
  constructor(middleContainer, id) {
    this._containerElementId = middleContainer;
    this._id = id;
    this.isDone = false;
  }

  get containerElementId() {
    return this._containerElementId;
  }

  get id() {
    return this._id;
  }

  get isDone() {
    return this._isDone;
  }
  set isDone(value) {
    this._isDone = value;
  }

  addElement() {
    const strTaskNameValue = document.querySelector("#taskname").value;
    const strDescriptionValue =
      document.querySelector("#taskdescription").value;
    const strAssignedToValue = document.querySelector("#assignedto").value;
    const strDueDateValue = document.querySelector("#duedate").value;
    const strStatusValue = document.querySelector("#taskstatus").value;
    const opType = document.querySelector("#add-edit").value;
    const isdone = strStatusValue === "Done" ? true : false;

    const TaskCardObject = {
      id: TaskCardObjectList.length,
      TaskNameL: "Task Name: ",
      TaskNameV: strTaskNameValue,
      TaskDescL: "Task Description: ",
      TaskDescV: strDescriptionValue,
      TaskAssignToL: "Assigned To: ",
      TaskAssignToV: strAssignedToValue,
      TaskDueDateL: "Due Date: ",
      TaskDueDateV: strDueDateValue,
      TaskStatusL: "Task Status: ",
      TaskStatusV: strStatusValue,
      TaskIsDoneV: isdone,
      TaskVisibility: true,
    };

    TaskCardObjectList.unshift(TaskCardObject);
    this.render();
  }

  done_undone(cardid) {
    const selectedDoneIndex = TaskCardObjectList.findIndex(
      (card) => card.id == cardid
    );
    if (TaskCardObjectList[selectedDoneIndex].TaskIsDoneV === false) {
      TaskCardObjectList[selectedDoneIndex].TaskIsDoneV = true;
      TaskCardObjectList[selectedDoneIndex].TaskStatusV = "Done";
    } else {
      TaskCardObjectList[selectedDoneIndex].TaskIsDoneV = false;
      TaskCardObjectList[selectedDoneIndex].TaskStatusV = "Review";
    }
    this.render();
  }

  deleteElement(cardid) {
    const result = confirm("Are you Sure to delete this task?");
    if (result) {
      const selectedDelIndex = TaskCardObjectList.findIndex(
        (card) => card.id == cardid
      );
      TaskCardObjectList.splice(selectedDelIndex, 1);
      this.render();
    }
  }

  editElement(cardid) {
    const selectedEditIndex = TaskCardObjectList.findIndex(
      (card) => card.id == cardid
    );

    myOpenForm("Edit");
    document.querySelector("#edit-parent-id").value = selectedEditIndex;
    document.querySelector("#taskname").value =
      TaskCardObjectList[selectedEditIndex].TaskNameV;
    document.querySelector("#taskdescription").value =
      TaskCardObjectList[selectedEditIndex].TaskDescV;
    document.querySelector("#assignedto").value =
      TaskCardObjectList[selectedEditIndex].TaskAssignToV;
    document.querySelector("#duedate").value =
      TaskCardObjectList[selectedEditIndex].TaskDueDateV;
    document.querySelector("#taskstatus").value =
      TaskCardObjectList[selectedEditIndex].TaskStatusV;
  }

  updateElement() {
    const selectedEditIndex = document.querySelector("#edit-parent-id").value;
    TaskCardObjectList[selectedEditIndex].TaskNameV =
      document.querySelector("#taskname").value;
    TaskCardObjectList[selectedEditIndex].TaskDescV =
      document.querySelector("#taskdescription").value;
    TaskCardObjectList[selectedEditIndex].TaskAssignToV =
      document.querySelector("#assignedto").value;
    TaskCardObjectList[selectedEditIndex].TaskDueDateV =
      document.querySelector("#duedate").value;
    TaskCardObjectList[selectedEditIndex].TaskStatusV =
      document.querySelector("#taskstatus").value;
    const isdone =
      document.querySelector("#taskstatus").value === "Done" ? true : false;
    TaskCardObjectList[selectedEditIndex].TaskIsDoneV = isdone;
    this.render();
  }

  render() {
    this._containerElementId.innerHTML = "";
    TaskCardObjectList.forEach((object_item) => {
      const mainCard = document.createElement("div");
      const editBtn = document.createElement("img");
      const delBtn = document.createElement("img");
      const statusBtn = document.createElement("img");
      const cardText = document.createElement("div");
      const h51L = document.createElement("h5");
      const h52L = document.createElement("h5");
      const h53L = document.createElement("h5");
      const h54L = document.createElement("h5");
      const h55L = document.createElement("h5");
      const tnameV = document.createElement("p");
      const tdescV = document.createElement("p");
      const assignedToV = document.createElement("p");
      const duedateV = document.createElement("p");
      const statusV = document.createElement("p");
      let statusImgName = "";
      let statusImgAltText = "";

      h51L.innerText = object_item.TaskNameL;
      tnameV.innerText = object_item.TaskNameV;
      h52L.innerText = object_item.TaskDescL;
      tdescV.innerText = object_item.TaskDescV;
      h53L.innerText = object_item.TaskAssignToL;
      assignedToV.innerText = object_item.TaskAssignToV;
      h54L.innerText = object_item.TaskDueDateL;
      duedateV.innerText = object_item.TaskDueDateV;
      h55L.innerText = object_item.TaskStatusL;
      statusV.innerText = object_item.TaskStatusV;
      statusV.className = "card-status-value";
      statusV.setAttribute("data-id", object_item.id);

      switch (object_item.TaskStatusV) {
        case "To Do":
          statusImgName = "images/todo.png";
          statusImgAltText = "Status: To Do";
          break;
        case "In-Progress":
          statusImgName = "images/in-progress.png";
          statusImgAltText = "Status: In-Progress";
          break;
        case "Review":
          statusImgName = "images/review.png";
          statusImgAltText = "Status: Review";
          break;
        case "Done":
          statusImgName = "images/Done.svg";
          statusImgAltText = "Status: Done";
          break;
      }

      mainCard.setAttribute("data-id", object_item.id);
      mainCard.className = "flex-card";
      cardText.setAttribute("data-id", object_item.id);
      cardText.className = "card-text";
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
      cardText.appendChild(statusV);

      editBtn.setAttribute("data-id", object_item.id);
      editBtn.className = "card-icon-img";
      editBtn.src = "images/pencil-square.svg";
      editBtn.alt = "Edit Icon";
      editBtn.title = "Edit Task";

      delBtn.setAttribute("data-id", object_item.id);
      delBtn.classList.add("card-icon-img");
      delBtn.src = "images/trash.svg";
      delBtn.alt = "Delete Icon";
      delBtn.title = "Delete Task";

      statusBtn.setAttribute("data-id", object_item.id);
      statusBtn.classList.add("card-icon-img-status");
      statusBtn.src = statusImgName;
      statusBtn.alt = statusImgAltText;
      statusBtn.title = statusImgAltText;

      delBtn.addEventListener("click", function (d) {
        const deleteId = d.target.getAttribute("data-id");
        myTaskCardList.deleteElement(deleteId);
      });
      editBtn.addEventListener("click", function (e) {
        const editId = e.target.getAttribute("data-id");
        myTaskCardList.editElement(editId);
      });

      statusBtn.addEventListener("click", submitButtonChange);

      function submitButtonChange(e) {
        const doneId = e.target.getAttribute("data-id");
        myTaskCardList.done_undone(doneId);
      }

      if (object_item.TaskIsDoneV) {
        cardText.classList.add("checked");
      } else {
        cardText.className = "card-text";
      }

      mainCard.appendChild(delBtn);
      mainCard.appendChild(editBtn);
      cardText.appendChild(statusBtn);
      mainCard.appendChild(cardText);

      this._containerElementId.appendChild(mainCard);

      if (object_item.TaskVisibility === false) {
        mainCard.style.display = "none";
      } else {
        mainCard.style.display = "block";
      }
    });
  }
}
