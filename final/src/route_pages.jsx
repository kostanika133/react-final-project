import { Route, Routes } from "react-router-dom";
import every_page from "./config/every_page";
function Route_pages() {
  return (
    <Routes>
      {every_page.map((e) => {
        return <Route path={e.path} Component={e.component} />;
      })}
    </Routes>
  );
}
export default Route_pages;
