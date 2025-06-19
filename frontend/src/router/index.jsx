import { createBrowserRouter } from "react-router";
import { Home } from "../pages/home";
import { Login } from "../pages/login";
import { Register } from "../pages/register";
import { ChatRoomPage } from "../pages/chatroom/chatroompage";

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
    path: "/chatroom",
    element: <ChatRoomPage />,
  },
]);

export default Router;
