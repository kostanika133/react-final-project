import Home from "../pages/home/home";
import Recipes from "../pages/recipes/recipes";
import Favorites from "../pages/favorites/favorites";
import Sign_in from "../pages/sign_in/sign_in";
import Sign_up from "../pages/sign_up/sign_up";
import Recipes_Details from "../pages/recipes/recipes_details";
import paths from "../constants/path";
import AuthGuard from "../guards/authGuard";
import GuestGuard from "../guards/guestGuard";

const every_page = [
  { path: paths.Home, component: Home },
  { path: paths.Recipes, component: Recipes, Guard: AuthGuard },
  { path: paths.Favorites, component: Favorites, Guard: AuthGuard },
  { path: paths.Sign_in, component: Sign_in, Guard: GuestGuard },
  { path: paths.Sign_up, component: Sign_up, Guard: GuestGuard },
  {
    path: paths.Recipe_details,
    component: Recipes_Details,
    Guard: AuthGuard,
  },
];

export default every_page;
