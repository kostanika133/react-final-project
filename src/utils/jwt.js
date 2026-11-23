import { jwtDecode } from "jwt-decode";

export const toggleLocalStorage = (token) => {
  if (token) {
    localStorage.setItem("token", token);
    return;
  }

  localStorage.removeItem("token");
};

export const isTokenValid = (token) => {
  try {
    const decodeToken = jwtDecode(token);
    const date = Date.now() / 1000;
    return Boolean(decodeToken.exp && date < decodeToken.exp);
  } catch {
    return false;
  }
};

export const getToken = () => localStorage.getItem("token");
