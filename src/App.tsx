import "./App.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "../src/Modules/Shared-Components/Components/routes/routes";

// Pages & Layouts
import NotFound from "../src/Modules/Shared-Components/Components/NotFound/NotFound";
import AuthLayout from "../src/Modules/Shared-Components/Components/Auth/Auth";
import MasterLayout from "../src/Modules/Shared-Components/Components/MasterLayout/MasterLayout";
import Dashboard from "../src/Modules/Dashboard/Component/DashBoard";
import Login from "../src/Modules/Authentication/Components/Login/Login";
import Register from "../src/Modules/Authentication/Components/Register/Register";
import VerifyAcc from "../src/Modules/Authentication/Components/Verify-Account/Verify-Account";
import ForgetPassword from "./Modules/Authentication/Components/Forget-Password/ForgetPassword";
import RestPassword from "./Modules/Authentication/Components/Rest-Password/Rest-PAssword";
import ChangePassword from "./Modules/Authentication/Components/Change-Password/ChangePassword";

function App() {
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> }, // Default to Login
        { path: ROUTES.LOGIN.slice(1), element: <Login /> },
        { path: ROUTES.REGISTER.slice(1), element: <Register /> },
        { path: ROUTES.FORGET_PASSWORD.slice(1), element: <ForgetPassword /> },
        { path: ROUTES.RESET_PASSWORD.slice(1), element: <RestPassword /> },
        { path: ROUTES.VERIFY_ACCOUNT.slice(1), element: <VerifyAcc /> },
        { path: ROUTES.CHANGE_PASSWORD.slice(1), element: <ChangePassword /> },
      ],
    },
    {
      path: ROUTES.DASHBOARD.slice(1),
      element: <MasterLayout />, // No ProtectedRoute
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        // Add more open routes here
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-right" autoClose={3000} limit={3} />
    </>
  );
}

export default App;
