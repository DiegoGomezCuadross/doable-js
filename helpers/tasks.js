import apiFetch from "../services/api-fetch.js";

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
// export async function updateContacts{id}{

// }
