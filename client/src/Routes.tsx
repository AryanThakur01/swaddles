import { createBrowserRouter } from "react-router-dom";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";

export default createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
