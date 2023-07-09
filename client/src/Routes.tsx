import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account/Account";
import Personal from "./components/pages/Account/Personal";
import ManageAddress from "./components/pages/Account/ManageAddress";
import MyOrders from "./components/pages/MyOrders";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/account/personal",
    element: <Personal />,
  },
  {
    path: "/account/address",
    element: <ManageAddress />,
  },
  {
    path: "/account/myOrders",
    element: <MyOrders />,
  },
]);
