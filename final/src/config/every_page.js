import Home from "../pages/home/home";
import Recipes from "../pages/recipes/recipes";
import Sign_in from "../pages/sign_in/sign_in";
import Sign_up from "../pages/sign_up/sign_up";
import paths from "../constants/path";
import AuthGuard from "../guards/authGuard";

const every_page = [
  { path: paths.Home, component: Home },
  { path: paths.Recipes, component: Recipes, Guard: AuthGuard },
  { path: paths.Sign_in, component: Sign_in },
  { path: paths.Sign_up, component: Sign_up },
];
export default every_page;
