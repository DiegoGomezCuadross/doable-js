import { listTasks } from "./helpers/tasks.js";

async function fetchListTasks() {
  const tasks = await listTasks();
  this.task = tasks;
}
const STORE = {
  user: null,
  task: [],
  fetchListTasks,
  addTask(addTaskFinal) {
    this.task.push(addTaskFinal);
  },
};
console.log(STORE);

export default STORE;
