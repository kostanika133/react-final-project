import { Route, Routes } from "react-router-dom";
import every_page from "./config/every_page";

function RoutePages() {
  return (
    <Routes>
      {every_page.map((e) => (
        <Route key={e.path} path={e.path} element={<e.component />} />
      ))}
    </Routes>
  );
}

export default RoutePages;
