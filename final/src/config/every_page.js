import Home from "../pages/home/home";
import Products from "../pages/products/products";
import Sign_in from "../pages/sign_in/sign_in";
import Sign_up from "../pages/sign_up/sign_up";
import paths from "../constants/path";

const every_page = [
  { path: paths.Home, component: Home },
  { path: paths.Products, component: Products },
  { path: paths.Sign_in, component: Sign_in },
  { path: paths.Sign_up, component: Sign_up },
];
export default every_page;
