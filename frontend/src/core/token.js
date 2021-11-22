import api from "./api";

export default function init() {
  const token = sessionStorage.getItem("token");
  if (token) {
    api.defaults.headers.common = { Authorization: `Bearer ${token}` };
  }
}

export function setToken(token) {
  api.defaults.headers.common = { Authorization: `Bearer ${token}` };
  sessionStorage.setItem("token", token);
}

export function getToken() {
  return sessionStorage.getItem("token");
}
