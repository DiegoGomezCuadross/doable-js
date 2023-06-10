import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/login-page.js";
import HomePage from "./pages/home-page.js";
// import { getUser } from "./services/user-service.js";
import { tokenKey } from "./config.js";
import { login } from "./services/sessions.js";
import STORE from "./store.js";

async function init() {
  // DOMHandler.load(LoginPage);
  // const user = await login();
  const token = sessionStorage.getItem(tokenKey);
  //PREGUNTA SI EL TOKEN EXISTE
  if (!token) return DOMHandler.load(LoginPage);
  STORE.user = user;
  await STORE.fetchTasks();
  //   const user = await getUser();
  //   DOMHandler.load(LoginPage);
  // } catch (error) {
  //   sessionStorage.removeItem(tokenKey);
  //   DOMHandler.load(LoginPage);
  // }
}
login({
  email: "diego2003@mail.com",
  password: "123456",
}).then(() => init());

// init();
