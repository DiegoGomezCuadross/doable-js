import apiFetch from "../services/api-fetch.js";
import STORE from "../store.js";

export async function listTasks() {
  return await apiFetch("tasks");
}

export async function createTasks(
  newTask = {
    title,
    due_date,
  }
) {
  return await apiFetch("tasks", { body: newTask });
}

export async function deleteTasks(id) {
  return await apiFetch(`tasks/${id}`, { method: "DELETE" });
}

export async function showTask(id) {
  return await apiFetch(`tasks/${id}`);
}

export async function updateTask(id, updateTask) {
  console.log(updateTask);
  await apiFetch(`tasks/${id}`, { method: "PATCH", body: updateTask });
  if (updateTask.important) {
    console.log("ejecutando important");
    STORE.updateTaskImportantFromStore(id, updateTask);
  }
  if (updateTask.completed) {
    console.log("ejecutando completed");
    STORE.updateTaskCompletedFromStore(id, updateTask);
  }
}
// export async function updateContacts{id}{

// }
