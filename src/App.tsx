import "./App.css";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Make sure this file is updated as shown above
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
import { AuthContext } from "./Context/AuthContext";
import ProtectedRoute from "./Modules/Shared-Components/Components/ProtectedRoute/ProtectedRoute";
import User from "./Modules/Users-Module/Component/User-List/User";
import Projects_List from "./Modules/Projects-Module/Components/Projects-List/Projects_List";
import Projects_Data from "./Modules/Projects-Module/Components/Projects-Data/Projects_Data";
import Tasks_List from "./Modules/Tasks-Module/Components/Tasks-List/Tasks_List";
import Tasks_Data from "./Modules/Tasks-Module/Components/Tasks-Data/Tasks_Data";
import { useContext } from "react";
import EmployeeTask from "./Modules/Tasks-Module/Components/EmployeeTask/EmployeeTask";

function App() {
  const { loginData } = useContext(AuthContext);
  const routes = createBrowserRouter([
    {
      path: ROUTES.ROOT,
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
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
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        // FIX 2: Removed redundant dashboard path. The 'index' route is enough.
        { index: true, element: <Dashboard /> },
        { path: ROUTES.Users.slice(1), element: <User /> },
        { path: ROUTES.Projects_List.slice(1), element: <Projects_List /> },
        { path: ROUTES.Projects_Data.slice(1), element: <Projects_Data /> },
        { path: ROUTES.Tasks_List.slice(1), element: <Tasks_List /> },
        {
          path:
            loginData?.userGroup == "Manager"
              ? ROUTES.Tasks_List.slice(1)
              : ROUTES.EmployeeTask.slice(1),
          element:
            loginData?.userGroup == "Manager" ? (
              <Tasks_List />
            ) : (
              <EmployeeTask />
            ),
        },
        // This route handles creating a task
        { path: ROUTES.Tasks_Data.slice(1), element: <Tasks_Data /> },
        // FIX 1: ADDED a new route to handle updating a task
        // It uses the same Tasks_Data component, which is what we want.
        { path: ROUTES.Tasks_Update.slice(1), element: <Tasks_Data /> },
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
