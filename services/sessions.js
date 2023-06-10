import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

//FUNCION LOGIN
export async function login(credentials = { email, password }) {
  //USAMOS LA FUNCION APIFETCH Y LE PASAMOS EL ENDPOINT(LOGIN, LOGOUT) Y LAS CREDENCIALES
  const { token, ...user } = await apiFetch("login", { body: credentials });
  sessionStorage.setItem(tokenKey, token);
  return user;
}

export async function logout() {
  const data = await apiFetch("logout", { method: "DELETE" });
  sessionStorage.removeItem(tokenKey);

  return data;
}
