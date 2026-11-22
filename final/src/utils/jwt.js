import { jwtDecode } from "jwt-decode";

export const toggleLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    return;
  } else {
    localStorage.removeItem("token");
  }
};

export const isTokenValid = (token) => {
  const decodeToken = jwtDecode(token);
  const date = Date.now() / 1000;
  return date < decodeToken.exp;
};

export const getToken = () => {
  return localStorage.getItem("token");
};
