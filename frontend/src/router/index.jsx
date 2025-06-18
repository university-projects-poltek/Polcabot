import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import AdminDashboard from "../pages/admin/dashboard";
import UserHome from "../pages/user/home";
import { Register } from "../pages/register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/user/home",
    element: <UserHome />,
  },
]);

export default Router;
