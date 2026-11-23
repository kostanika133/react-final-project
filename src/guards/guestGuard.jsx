import { Navigate } from "react-router-dom";
import paths from "../constants/path";
import { useAppContext } from "../context/appProvider";

function GuestGuard({ children }) {
  const { state } = useAppContext();

  if (state.isAuthenticated) {
    return <Navigate to={paths.Recipes} replace />;
  }

  return children;
}

export default GuestGuard;
