import { BASE_URI, tokenKey } from "../config.js";

export default async function apiFetch(
  endpoint,
  { method, headers, body } = {}
) {
  const token = sessionStorage.getItem(tokenKey);

  //SI HAY UN TOKEN, AGREGA UNA AUTORIZACION SOBRE EL HEADER
  if (token) {
    headers = {
      Authorization: `Token token=${token}`,
      ...headers,
    };
  }

  //SI EXISTE UN BODY, AGREGA UN CONTENT-TYPE AL HEADERS
  if (body) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
  }
  //CONTRUIR UN CONFIG PARA HACER UN FETCH ORIGINAL
  const config = {
    //EN CASO EL METHOD CONTENGA UN BODY, ES UN POST. DE LO CONTRARIO ES UN GET
    method: method || (body ? "POST" : "GET"),
    //HEADERS, = HEADERS: HEADERS (EL VALOR QUE PASAMOS EN LA LINEA 16)
    headers,
    //SI EXISTA BODY LO TRANSFORMA ES UN STRING DE LO CONTRARIO LO AGREGA COMO NULL
    body: body ? JSON.stringify(body) : null,
  };

  //EL ENDPOINT REPRESENTA LO QUE LE PASEMOS, EJEM: LOGIN,LOGOUT,CONTACTS,ETC
  const response = await fetch(`${BASE_URI}/${endpoint}`, config);

  //CAPTURA LOS ERRORES QUE PUEDEN SUCEDER EN LA CONEXION CON LA API (LOGIN, LOGOUT, DELETE, SHOW)
  let data;
  if (!response.ok) {
    try {
      data = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    throw new Error(data.errors);
  }

  try {
    data = await response.json();
  } catch (error) {
    data = response.statusText;
  }

  return data;
}
