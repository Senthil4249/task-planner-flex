// Om Murugan Thunai
//importing the required shared functions and objects from main.js file
import { myTaskCardList, myOpenForm, getFormattedDate } from "./main.js";

// Creates and Empty Array for the list of Task object to store
let TaskCardObjectList = [];

// Creates the Class definition for TaskManager
class TaskManager_Class {
  constructor(middleContainer, id) {
    this._containerElementId = middleContainer;
    this._id = id;
    this.isDone = false;
  }
  // getter
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

  // Function to add Task object into TaskListarray and call the Render function to display them in HTML
  addElement() {
    // Assign the formValues to variables
    const strTaskNameValue = document.querySelector("#taskname").value;
    const strDescriptionValue =
      document.querySelector("#taskdescription").value;
    const strAssignedToValue = document.querySelector("#assignedto").value;
    const strDueDateValue = document.querySelector("#duedate").value;
    const strStatusValue = document.querySelector("#taskstatus").value;
    const opType = document.querySelector("#add-edit").value;
    const isdone = strStatusValue === "Done" ? true : false;

    // creates an object for a Task
    const TaskCardObject = {
      id: TaskCardObjectList.length,
      TaskNameV: strTaskNameValue,
      TaskDescV: strDescriptionValue,
      TaskAssignToV: strAssignedToValue,
      TaskDueDateV: strDueDateValue,
      TaskStatusV: strStatusValue,
      TaskIsDoneV: isdone,
      TaskVisibility: true,
    };

    // pushes the object into Array as the first element.
    TaskCardObjectList.unshift(TaskCardObject);
    this.render(); //calls the render function to display the task card
  }
  // function to toggle a task between done and other status
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
  // function to delete a card when delete btn clicked
  deleteElement(cardid) {
    const result = confirm("Are you Sure you want to delete this task?");
    if (result) {
      const selectedDelIndex = TaskCardObjectList.findIndex(
        (card) => card.id == cardid
      );
      TaskCardObjectList.splice(selectedDelIndex, 1);
      this.render();
    }
  }
  //function to update/edit values of a card when edit button is clicked
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
  // updating elements when edit button clicked
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
  // function to display the cards from array to html
  render() {
    const cardMainArea = document.querySelector("#m-container");
    //creating 4 arrays for each status section
    let tasksHtmlList_td = [];
    let tasksHtmlList_ip = [];
    let tasksHtmlList_rv = [];
    let tasksHtmlList_dn = [];
    // loops through all the objects inside array to display into thier corresponing html section
    TaskCardObjectList.forEach((object_item) => {
      let html = "";
      let classChecked = "";
      let cardVisibility = "";
      let statusImgName = "";

      //switch statment to find the stauts and assign their respective images
      switch (object_item.TaskStatusV) {
        case "To Do":
          statusImgName = "images/todo.png";
          break;
        case "In-Progress":
          statusImgName = "images/in-progress.png";
          break;
        case "Review":
          statusImgName = "images/review.png";
          break;
        case "Done":
          statusImgName = "images/Done.svg";
          break;
      }
      // if status is "done" for a card and their  elements value will be striked out
      if (object_item.TaskIsDoneV) {
        classChecked = "card-text checked";
      } else {
        classChecked = "card-text";
      }

      // to get the dynamic HTML text for each card with filled values and stores in "htmnl" variable
      html = this.getHTML(object_item, statusImgName, classChecked);

      // Push the html text into to the coresponding tasksHtmlList array
      if (object_item.TaskStatusV === "To Do") {
        tasksHtmlList_td.push(html);
      } else if (object_item.TaskStatusV === "In-Progress") {
        tasksHtmlList_ip.push(html);
      } else if (object_item.TaskStatusV === "Review") {
        tasksHtmlList_rv.push(html);
      } else if (object_item.TaskStatusV === "Done") {
        tasksHtmlList_dn.push(html);
      }

      // Create the tasksHtml by joining each item in the tasksHtmlList

      // with a new line in between each item.() - joining the html card objects
      const tasksHtml_td = tasksHtmlList_td.join("\n");
      const tasksHtml_ip = tasksHtmlList_ip.join("\n");
      const tasksHtml_rv = tasksHtmlList_rv.join("\n");
      const tasksHtml_dn = tasksHtmlList_dn.join("\n");

      //getting the id's for respective task status boxes
      const tasksList_td = document.querySelector("#task-list-td");
      const tasksList_ip = document.querySelector("#task-list-ip");
      const tasksList_rv = document.querySelector("#task-list-rv");
      const tasksList_dn = document.querySelector("#task-list-dn");

      // Set the inner html of the tasksList on the page
      tasksList_td.innerHTML = tasksHtml_td;
      tasksList_ip.innerHTML = tasksHtml_ip;
      tasksList_rv.innerHTML = tasksHtml_rv;
      tasksList_dn.innerHTML = tasksHtml_dn;
    });
  }
  // creating a html skleton for the card with filled dynamic values
  getHTML(obj, statusImgName, classChecked) {
    let htmlText = "";
    htmlText = `<div data-id="${
      obj.id
    }" class="flex-card" style="display: block">
    <img
      data-id="${obj.id}"
      class="card-icon-img-del"
      src="images/trash.svg"
      alt="Delete Icon"
      title="Delete Task"
    /><img
      data-id="${obj.id}"
      class="card-icon-img-edit"
      src="images/pencil-square.svg"
      alt="Edit Icon"
      title="Edit Task"
    />
    <div data-id="${obj.id}" class="${classChecked}">
      <h5 class="task-title">${obj.TaskNameV}</h5>
      <p class="task-text">${obj.TaskDescV}</p>
      <div class="assign-div">
        <p class="task-text">${obj.TaskAssignToV}</p>
        <p class="task-text">${getFormattedDate(obj.TaskDueDateV)}</p>
      </div>
      <div class="status-div">
        <p class="card-status-value" data-id="${obj.id}">${obj.TaskStatusV}</p>
      </div>
      <img
        data-id="${obj.id}"
        class="card-icon-img-status"
        src="${statusImgName}"
        alt="status: ${obj.TaskStatusV}"
        title="status: ${obj.TaskStatusV}"
      />
    </div>
  </div>`;
    return htmlText;
  }
}
//exporting the shared objects to be availble for other js files.
export { TaskCardObjectList, TaskManager_Class };
