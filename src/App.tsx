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
<<<<<<< HEAD
import UserProfile from "./Modules/Shared-Components/Profile/Profile"; // Import the UserProfile component
=======
import { useContext } from "react";
import EmployeeTask from "./Modules/Tasks-Module/Components/EmployeeTask/EmployeeTask";
>>>>>>> 1403b30410ded9d8daeadce8c9d1fa5916b54beb

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
        { index: true, element: <Dashboard /> },
        { path: ROUTES.Users.slice(1), element: <User /> },
        { path: ROUTES.Projects_List.slice(1), element: <Projects_List /> },
        { path: ROUTES.Projects_Data.slice(1), element: <Projects_Data /> },
        { path: ROUTES.Tasks_List.slice(1), element: <Tasks_List /> },
<<<<<<< HEAD
=======
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
>>>>>>> 1403b30410ded9d8daeadce8c9d1fa5916b54beb
        { path: ROUTES.Tasks_Data.slice(1), element: <Tasks_Data /> },
        { path: ROUTES.Tasks_Update.slice(1), element: <Tasks_Data /> },
        // Added the new route for the user profile
        { path: ROUTES.PROFILE.slice(1), element: <UserProfile /> },
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
