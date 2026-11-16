import { useReducer, createContext, useContext } from "react";
import { initialState, reducer } from "./reducer";

const context = createContext();

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <context.Provider value={{ state, dispatch }}>{children}</context.Provider>
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
