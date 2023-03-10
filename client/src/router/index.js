import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../components/Layout";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PostPage from "../pages/PostPage";
import RegisterPage from "../pages/RegisterPage";
import UploadAndDisplayImage from "../pages/tes";
import UserPage from "../pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    path: "/register",
    element: <RegisterPage />,
    loader: () => {
      if (localStorage.getItem("access_token")) {
        throw redirect("/");
      }
      return null;
    },
  },
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.getItem("access_token")) {
        throw redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/",
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
      {
        path: "/upload",
        element: <UploadAndDisplayImage />,
      },
    ],
  },
]);

export default router;
