import appActions from "./actions";
import { jwtDecode } from "jwt-decode";

export const initialState = {
  user: null,
  isAuthenticated: false,
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
    case appActions.auth:
      const decodeToken = jwtDecode(payload);
      return { ...state, isAuthenticated: true, user: decodeToken.email };
    default:
      return state;
  }
}
