import DOMHandler from "../dom-handler.js";
// import HomePage from "./home-page.js";
import { createUser } from "../helpers/sessions.js";
import { input } from "../components/input.js";
import LoginPage from "./login.js";
import { logout } from "../helpers/sessions.js";
import STORE from "../store.js";

function render() {
  console.log(STORE.task);
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
                    <option value="opcion1" selected>Alphabetical (a-z)</option>
                    <option value="opcion2">Due date</option>
                    <option value="opcion3">Importance</option>
                </select><br>
            </div>
            <div class="container-search-2">
                <label for="opcions" class="margin-left-18 typo">Show</label>
                <label class="typo"><input type="checkbox" id="cbox1" value="pending">Only pending</label>
                <label class="typo"><input type="checkbox" id="cbox2" value="important">Only important</label>
            </div>
            <div class="container-tasks">
                ${STORE.task.map(
                  (ele) =>
                    `<div class="task-container">
                    <input type="checkbox" id="task1">
                    <label for="task1">
                        <span class="task-text">
                            ${ele.title}
                            <img src="/images/important-on.svg" alt="icon-important" class="icon">
                        </span>
                        <span class="task-date">${ele.created_at}</span>
                    </label>
                </div>`
                )} 
            </div>
            <div class="container-new-task">
                <input type="text" id="new-task" placeholder="do the dishes..." class="input-new-task">
                <input type="date" id="new-task" placeholder="do the dishes..." class="input-new-task">
                <button class="button button--primary width-full text-button">Add Task</button>
            </div>
        </section>
    </div>`;
}

// function listenSubmitForm() {
//   const form = document.querySelector(".js-signup-form");

//   form.addEventListener("submit", async (e) => {
//     try {
//       e.preventDefault();

//       const { email, password } = e.target.elements;

//       const credentials = {
//         email: email.value,
//         password: password.value,
//       };

//       await createUser(credentials);
//     } catch (error) {
//       this.state.loginError = error.message;
//       DOMHandler.reload();
//     }
//   });
// }

function logoutSession() {
  const signup = document.getElementById("logout-session");

  signup.addEventListener("click", async () => {
    await logout();
    DOMHandler.load(LoginPage);
  });
}

const HomePage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    logoutSession.call(this);
    // listenSubmitForm.call(this);
    // changeViewToLogin.call(this);
  },
};

export default HomePage;
