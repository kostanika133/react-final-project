import { Navigate, Route, Routes } from "react-router-dom";
import every_page from "./config/every_page";
import paths from "./constants/path";

function RoutePages() {
  return (
    <Routes>
      {every_page.map((e) => {
        const Component = e.component;
        const Guard = e.Guard;

        let routeElement = <Component />;

        if (Guard) {
          routeElement = (
            <Guard>
              <Component />
            </Guard>
          );
        }

        return <Route key={e.path} path={e.path} element={routeElement} />;
      })}
      <Route path="*" element={<Navigate to={paths.Home} replace />} />
    </Routes>
  );
}

export default RoutePages;
