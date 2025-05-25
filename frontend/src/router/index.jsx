import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Login } from "../pages/login";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default Router;
