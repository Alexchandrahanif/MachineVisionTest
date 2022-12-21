import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/Layout";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import RegisterPage from "../pages/RegisterPage";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: <Layout />,
    // loader: () => {
    //   if (!localStorage.getItem("access_token")) {
    //     throw redirect("/login");
    //   } else if (
    //     localStorage.getItem("access_token") &&
    //     !localStorage.getItem("restoId")
    //   ) {
    //     throw redirect("/register-resto");
    //   }
    // },
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/post",
        element: <PostPage />,
      },
      {
        path: "/change",
        element: <ChangePasswordPage />,
      },
    ],
  },
]);

export default router;
