import {
  listTasks,
  showTask,
  deleteTasks,
} from "./services/contact-service.js";

async function fetchTasks() {
  const tasks = await listTasks();

  // this.contacts = contacts;
  this.favorite = tasks.filter((task) => task.favorite == true);

  this.normal = tasks.filter((task) => task.favorite == false);
  // buildContacts(contacts);
}

async function fetchShowTasks(id) {
  const task = await showTasks(id);

  return task;
}

async function fetchDeleteTask(id) {
  await deleteTasks(id);
  const indexFromFavorite = this.favorite.findIndex((task) => task.id == id);
  const indexFromNormal = this.normal.findIndex((task) => task.id == id);
  if (indexFromFavorite < 0) {
    this.normal.splice(indexFromNormal, 1);
  } else {
    this.favorite.splice(indexFromFavorite, 1);
  }
  // const contacts = this.normal.concat(this.favorite);
}

const STORE = {
  user: null,
  fetchTasks,
  fetchShowTask,
  fetchDeleteTask,
  selectedTask: null,
};

export default STORE;
