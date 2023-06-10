import DOMHandler from "../dom-handler.js";
// import HomePage from "./home-page.js";
import { createUser } from "../helpers/sessions.js";
import { input } from "../components/input.js";
import LoginPage from "./login.js";

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
            <form action="" class="full-width container-sm flex flex-column gap-4 js-signup-form">
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
                Create account
                </button>
            </form>
            <a href="#" class="text-button margin-bottom" id="login-back">Login</a>
            </div>
        </section>
    </div>`;
}

function listenSubmitForm() {
  const form = document.querySelector(".js-signup-form");

  form.addEventListener("submit", async (e) => {
    try {
      e.preventDefault();

      const { email, password } = e.target.elements;

      const credentials = {
        email: email.value,
        password: password.value,
      };

      await createUser(credentials);
    } catch (error) {
      this.state.loginError = error.message;
      DOMHandler.reload();
    }
  });
}

function changeViewToLogin() {
  const signup = document.getElementById("login-back");

  signup.addEventListener("click", () => {
    DOMHandler.load(LoginPage);
  });
}

const SignupPage = {
  toString() {
    return render.call(this);
  },
  addListeners() {
    listenSubmitForm.call(this);
    changeViewToLogin.call(this);
  },
  state: {
    loginError: null,
  },
};

export default SignupPage;
