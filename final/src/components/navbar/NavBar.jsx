import { useNavigate } from "react-router-dom";
import pages from "../../constants/path";
function Navbar() {
  const navigate = useNavigate();
  const navBarPages = Object.entries(pages);
  return (
    <nav>
      {navBarPages.map((e) => {
        const [name, path] = e;
        return (
          <button
            key={path}
            onClick={() => {
              navigate(path);
            }}
          >
            {name}
          </button>
        );
      })}
    </nav>
  );
}

export default Navbar;
