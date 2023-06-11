import DOMHandler from "../dom-handler.js";
// import HomePage from "./home-page.js";
import { createUser } from "../helpers/sessions.js";
import { input } from "../components/input.js";
import LoginPage from "./login.js";
import { logout } from "../helpers/sessions.js";
import STORE from "../store.js";
import { createTasks } from "../helpers/tasks.js";
import { sortedByDueDate } from "../helpers/sortedByDueDate.js";
import { sortedByAbc } from "../helpers/sortedByAbc.js";

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
                      console.log(new Date(datetask));
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
                    <input type="checkbox" id="task1">
                    <label for="task1">
                        <span class="task-text">
                           <p class="container-p">${ele.title}</p> 
                            <img src="/images/important-off.svg" alt="icon-important">
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
  },
};

export default HomePage;
