import DOMHandler from "./dom-handler.js";
// import { getUser } from "./services/user-service.js";
import { tokenKey, root } from "./config.js";
import { login } from "./helpers/sessions.js";
import STORE from "./store.js";
import LoginPage from "./pages/login.js";
import SignupPage from "./pages/signup.js";
import HomePage from "./pages/homePage.js";

// const router = {
//   login: LoginPage,
//   signup: SignupPage,
//   tasks: HomePage,
// };

async function init() {
  // DOMHandler.load(LoginPage);
  // const user = await login();
  const token = sessionStorage.getItem(tokenKey);
  //PREGUNTA SI EL TOKEN EXISTE
  if (!token) return DOMHandler.load(LoginPage);
}

init();
