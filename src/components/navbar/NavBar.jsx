import { useNavigate } from "react-router-dom";
import paths from "../../constants/path";
import { useAppContext } from "../../context/appProvider";
import appActions from "../../context/actions";
import { toggleLocalStorage } from "../../utils/jwt";

function Navbar() {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const navBarPages = Object.entries(paths).filter(([name]) => {
    if (name === "Recipe_details") {
      return false;
    }

    if (state.isAuthenticated) {
      return name !== "Sign_in" && name !== "Sign_up";
    }

    return name !== "Favorites";
  });

  function handleLogout() {
    toggleLocalStorage();
    dispatch({ type: appActions.signOut });
    navigate(paths.Home);
  }

  return (
    <nav className="navbar">
      {navBarPages.map(([name, path]) => (
        <button
          className="nav_buttons"
          key={path}
          onClick={() => navigate(path)}
        >
          {name.replaceAll("_", " ")}
        </button>
      ))}

      {state.isAuthenticated && (
        <button className="nav_buttons" onClick={handleLogout}>
          Log out
        </button>
      )}
    </nav>
  );
}

export default Navbar;
