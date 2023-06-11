import { listTasks } from "./helpers/tasks.js";

async function fetchListTasks() {
  const tasks = await listTasks();
  this.task = tasks;
  orderByAbc();
}
const STORE = {
  user: null,
  task: [],
  fetchListTasks,
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
