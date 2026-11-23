import appActions from "./actions";
import { jwtDecode } from "jwt-decode";

function getSavedData(key, fallback) {
  try {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : fallback;
  } catch {
    return fallback;
  }
}

export const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: getSavedData("favorites", []),
  recipes: getSavedData("recipes", []),
};

export function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case appActions.signIn: {
      const token = typeof payload === "string" ? payload : payload?.token;

      if (typeof token !== "string" || !token) {
        return state;
      }

      const user = jwtDecode(token);
      return { ...state, isAuthenticated: true, user };
    }

    case appActions.auth: {
      const decodeToken = jwtDecode(payload);
      return { ...state, isAuthenticated: true, user: decodeToken.email };
    }

    case appActions.favorites:
      return { ...state, favorites: payload };

    case appActions.recipes:
      return { ...state, recipes: payload };

    case appActions.signOut:
      return { ...state, user: null, isAuthenticated: false };

    default:
      return state;
  }
}
