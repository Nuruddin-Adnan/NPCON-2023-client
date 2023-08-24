import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NotFound from "../pages/NotFound/NotFound";
import Registration from "../pages/Registration/Registration";
import MyEntries from "../pages/MyEntries/MyEntries";
import PrivateRoute from "./PrivateRoute";
import AdminLogin from "../pages/Admin/Login/AdminLogin";
import ShowToAllRegistrations from "../pages/ShowToAllRegistrations/ShowToAllRegistrations";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/registration",
        element: (
          <PrivateRoute>
            <Registration />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-entries",
        element: (
          <PrivateRoute>
            <MyEntries />
          </PrivateRoute>
        ),
      },
      {
        path: "/show-to-all",
        element: (
          <PrivateRoute>
            <ShowToAllRegistrations />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
