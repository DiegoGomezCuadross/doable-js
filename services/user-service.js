import apiFetch from "./api-fetch.js";
import { tokenKey } from "../config.js";

export async function createUser(newUser = { email, password }) {
  const { token, ...user } = await apiFetch("signup", { body: newUser });

  sessionStorage.setItem(tokenKey, token);

  return user;
}

export async function getUser() {
  const { token, ...user } = await apiFetch("profile");
  return user;
}
