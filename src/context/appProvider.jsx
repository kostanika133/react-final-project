import { useReducer, createContext, useContext, useEffect } from "react";
import { initialState, reducer } from "./reducer";
import { getToken, isTokenValid } from "../utils/jwt";
import { authFunction } from "./actionCreators";

const context = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = getToken();

    if (token && isTokenValid(token)) {
      dispatch(authFunction(token));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state.favorites));
  }, [state.favorites]);

  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(state.recipes));
  }, [state.recipes]);

  return (
    <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  );
}

export const useAppContext = () => {
  const appContext = useContext(context);

  if (appContext) {
    return appContext;
  }

  throw new Error("app context is not found");
};

export default AppProvider;
