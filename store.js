import { listTasks } from "./helpers/tasks.js";

async function fetchListTasks() {
  const tasks = await listTasks();
  this.task = tasks;
  orderByAbc();
}
function updateTaskImportantFromStore(id, updateTask) {
  const newState = updateTask.important;
  const newArray = this.task.map((ele) => {
    if (ele.id == id) {
      ele.important = newState;
    }
    return ele;
  });
  this.task = newArray;
}

function updateTaskCompletedFromStore(id, updateTask) {
  const newState = updateTask.completed;
  const newArray = this.task.map((ele) => {
    if (ele.id == id) {
      ele.completed = newState;
    }
    return ele;
  });
  this.task = newArray;
}
const STORE = {
  user: null,
  task: [],
  fetchListTasks,
  updateTaskImportantFromStore,
  updateTaskCompletedFromStore,
  addTask(addTaskFinal) {
    this.task.push(addTaskFinal);
    orderByAbc();
  },
};

function orderByAbc() {
  STORE.task.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (titleA < titleB) {
      return -1;
    }

    if (titleA > titleB) {
      return 1;
    }

    return 0;
  });
}

export default STORE;
