import { Route, Routes } from "react-router-dom";
import every_page from "./config/every_page";

function RoutePages() {
  return (
    <Routes>
      {every_page.map((e) => {
        const Component = e.component;
        const Guard = e.Guard;

        const routeElement = Guard ? (
          <Guard>
            <Component />
          </Guard>
        ) : (
          <Component />
        );

        return <Route key={e.path} path={e.path} element={routeElement} />;
      })}
    </Routes>
  );
}

export default RoutePages;
