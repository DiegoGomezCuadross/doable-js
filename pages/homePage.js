import DOMHandler from "../dom-handler.js";
import { input } from "../components/input.js";
import LoginPage from "./login.js";
import { logout } from "../helpers/sessions.js";
import STORE from "../store.js";
import { createTasks, updateTask } from "../helpers/tasks.js";
import { sortedByDueDate } from "../helpers/sortedByDueDate.js";
import { sortedByAbc } from "../helpers/sortedByAbc.js";
import { sortedByImportance } from "../helpers/sortedByImportance.js";

function render() {
  return `
    <div id="container">
        <section class="container-doable" style="background-color: silver;">
            <header class="container-header">
                <div>
                    <span class="container-icons-header">
                        <img src="/images/{ doable }.svg" alt="Doable logo">
                        <img src="/images/logout.svg" alt="logout-icon" class="logout" id="logout-session">
                    </span>
                </div>
            </header>
            <div class="container-search-1">
                <label for="opcions" class="margin-left-18 typo">Sort</label>
                <select class="select-options">
                    <option value="option1" selected>Alphabetical (a-z)</option>
                    <option value="option2">Due date</option>
                    <option value="option3">Importance</option>
                </select><br>
            </div>
            <div class="container-search-2">
                <label for="opcions" class="margin-left-18 typo">Show</label>
                <label class="typo"><input type="checkbox" id="cbox1" value="pending">Only pending</label>
                <label class="typo"><input type="checkbox" id="cbox2" value="important">Only important</label>
            </div>
            <div class="container-tasks">
                ${STORE.task
                  .map((ele) => {
                    const datetask = ele.due_date;
                    this.formattedDate = "";

                    if (datetask !== null) {
                      const date = new Date(datetask);
                      const localDate = new Date(
                        date.getTime() + date.getTimezoneOffset() * 60000
                      );
                      this.formattedDate = localDate.toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        }
                      );
                    }
                    return `<div class="task-container">
                    ${
                      !ele.completed
                        ? `<input type="checkbox" class="completed-pending" name="pending" data-id="${ele.id}">`
                        : `<input type="checkbox" class="completed-pending" name="pending" checked data-id="${ele.id}">`
                    }
                    <label for="task1">
                        <span class="task-text">
                           <p class="container-p">${ele.title}</p> 
                           ${
                             !ele.important
                               ? `<img src="/images/important-off.svg" alt="icon-off" class="icon-important" data-id="${ele.id}">`
                               : `<img src="/images/important-on.svg" alt="icon-on" class="icon-important" data-id="${ele.id}">`
                           }
                        </span>
                        ${
                          this.formattedDate
                            ? `<span class="task-date">${this.formattedDate}</span>`
                            : ""
                        }
                    </label>
                </div>`;
                  })
                  .join("")} 
            </div>
            <form class="container-new-task js-task-form">
            ${input({
              label: "",
              id: "title",
              name: "title",
              placeholder: "do the dishes",
              type: "text",
              required: true,
              class: "input-new-task",
              value: "",
            })}
                ${input({
                  label: "",
                  id: "due_date",
                  name: "due_date",
                  placeholder: "",
                  type: "date",
                  required: false,
                  class: "input-new-task",
                  value: null,
                })}
                <button class="button button--primary width-full text-button" id="addTask">Add Task</button>
            </form>
        </section>
    </div>`;
}

function logoutSession() {
  const signup = document.getElementById("logout-session");

  signup.addEventListener("click", async () => {
    await logout();
    DOMHandler.load(LoginPage);
  });
}

function addNewTask() {
  const form = document.querySelector(".js-task-form");

  form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const { title, due_date } = e.target.elements;

      const credentials = {
        title: title.value,
        due_date: due_date.value,
      };

      const addTaskFinal = await createTasks(credentials);
      STORE.addTask(addTaskFinal);
      DOMHandler.load(HomePage);
    } catch (error) {
      console.log(error.message);
      DOMHandler.reload();
    }
  });
}

function orders() {
  const select = document.querySelector(".select-options");
  select.addEventListener("change", () => {
    if (select.value === "option1") {
      sortedByAbc();
    }
    if (select.value === "option2") {
      sortedByDueDate();
    }
    if (select.value === "option3") {
      sortedByImportance();
    }
  });
}

export function changeStateImportant() {
  const container = document.querySelector(".container-tasks");

  container.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("icon-important")) {
      const id = target.getAttribute("data-id");
      const alt = target.getAttribute("alt");
      let state = alt === "icon-off" ? false : true;
      console.log(id);
      const imgElement = document.createElement("img");
      imgElement.setAttribute("class", "icon-important");
      imgElement.setAttribute("data-id", id);
      const builder = target.parentElement;
      if (alt === "icon-off") {
        imgElement.setAttribute("src", "/images/important-on.svg");
        imgElement.setAttribute("alt", "icon-on");
        target.remove();
        builder.appendChild(imgElement);
      }
      if (alt === "icon-on") {
        imgElement.setAttribute("src", "/images/important-off.svg");
        imgElement.setAttribute("alt", "icon-off");
        target.remove();
        builder.appendChild(imgElement);
      }
      await updateTask(id, { important: !state });
    }
  });
}

function changeStatePending() {
  const container = document.querySelector(".container-tasks");

  container.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("completed-pending")) {
      const id = target.getAttribute("data-id");
      const name = target.getAttribute("name");
      let state = name === "pending" ? false : true;
      await updateTask(id, { completed: !state });
      console.log(STORE.task);
    }
  });
}
const HomePage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    logoutSession.call(this);
    addNewTask.call(this);
    orders.call(this);
    changeStateImportant.call(this);
    changeStatePending.call(this);
  },
};

export default HomePage;
