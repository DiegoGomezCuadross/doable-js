import DOMHandler from "./dom-handler.js";
// import { getUser } from "./services/user-service.js";
import { tokenKey } from "./config.js";
import { login } from "./helpers/sessions.js";
import STORE from "./store.js";
import LoginPage from "./pages/login.js";

async function init() {
  // DOMHandler.load(LoginPage);
  // const user = await login();
  const token = sessionStorage.getItem(tokenKey);
  //PREGUNTA SI EL TOKEN EXISTE
  if (!token) return DOMHandler.load(LoginPage);
}

init();
