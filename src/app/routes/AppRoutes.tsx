import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "@/pages/Login/Login";
import Home from "@/pages/Home/Home";
import RegisterForm from "@/pages/Register/RegisterForm";
import RegisterGoogleForm from "@/pages/Register/RegisterGoogleForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/register-google",
    element: <RegisterGoogleForm />,
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
