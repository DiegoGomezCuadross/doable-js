import DOMHandler from "../dom-handler.js";
// import HomePage from "./home-page.js";
import { login } from "../helpers/sessions.js";
import { input } from "../components/input.js";
import SignupPage from "./signup.js";
import HomePage from "./homepage.js";
import STORE from "../store.js";

function render() {
  const { loginError } = this.state;
  return `
    <div id="container">
        <section class="container-doable">
            <header class="container-header">
            <div>
                <img src="/images/{ doable }.svg" alt="Doable logo">
            </div>
            </header>
            <div class="container flex flex-column gap-8 items-center">
            <form action="" class="full-width container-sm flex flex-column gap-4 js-login-form">
                ${input({
                  label: "email",
                  id: "email",
                  name: "email",
                  placeholder: "user@example.com",
                  type: "email",
                  required: true,
                  value: "diego2003@mail.com",
                })}
                ${input({
                  label: "password",
                  id: "password",
                  name: "password",
                  placeholder: "********",
                  type: "password",
                  required: true,
                  value: "123456",
                })}
                ${
                  loginError
                    ? `<p class= "text-center error-300">${loginError}</p>`
                    : ""
                }
                <button type="submit" class="button button--primary width-full text-button">
                Login
                </button>
            </form>
            <a href="#" id="signup" class="text-button margin-bottom">Create Account</a>
            </div>
        </section>
    </div>`;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const { email, password } = e.target.elements;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      await login(credentials);
      await STORE.fetchListTasks();
      DOMHandler.load(HomePage);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

function changeViewToSignup() {
  const signup = document.getElementById("signup");

  signup.addEventListener("click", () => {
    DOMHandler.load(SignupPage);
  });
}

const LoginPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    changeViewToSignup.call(this);
  },
  state: {
    loginError: null,
  },
};

export default LoginPage;
