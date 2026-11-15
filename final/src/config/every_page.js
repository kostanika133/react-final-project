import Home from "../pages/home/home";
import Products from "../pages/products/products";
import Sign_in from "../pages/sign_in/sign_in";
import Sign_up from "../pages/sign_up/sign_up";

const every_page = [
  { path: "", component: Home },
  { path: "/products", component: Products },
  { path: "/sign_in", component: Sign_in },
  { path: "/sign_up", component: Sign_up },
];
export default every_page;
