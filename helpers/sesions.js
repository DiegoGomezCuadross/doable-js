import apiFetch from "../services/api-fetch.js";
import { tokenKey } from "../config.js";

//FUNCION LOGIN
export async function login(credentials = { email, password }) {
  //USAMOS LA FUNCION APIFETCH Y LE PASAMOS EL ENDPOINT(LOGIN, LOGOUT) Y LAS CREDENCIALES
  const { token } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
}

export async function logout() {
  const data = await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);
  console.log(data);
  return data;
}

export async function createUser(newUser = { email, password }) {
  const { token, ...user } = await apiFetch("signup", { body: newUser });
  sessionStorage.setItem(tokenKey, token);
  return user;
}
