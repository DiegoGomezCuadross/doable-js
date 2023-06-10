import { listTasks } from "./helpers/tasks.js";

async function fetchListTasks() {
  const tasks = await listTasks();
  this.task = tasks;
}

const STORE = {
  user: null,
  task: [],
  fetchListTasks,
};

export default STORE;
