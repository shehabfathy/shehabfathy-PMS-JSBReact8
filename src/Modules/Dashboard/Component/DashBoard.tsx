import { useContext, useEffect, useState } from "react";
import "./DashBoard.modules.css";
import { AuthContext } from "../../../Context/AuthContext";
import { LuChartBarBig } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { GoProjectSymlink } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
import axiosInstance, {
  taskUrl,
  userUrl,
} from "../../Shared-Components/api/authInstance";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";

export default function DashBoard() {
  const { loginData } = useContext(AuthContext);

  // ✅ safe defaults to prevent undefined
  const [tasks, setTask] = useState({ toDo: 0, inProgress: 0, done: 0 });
  const [users, setUser] = useState({
    activatedEmployeeCount: 0,
    deactivatedEmployeeCount: 0,
  });

  const getTasksCount = async () => {
    try {
      const { data } = await axiosInstance.get(taskUrl.count);
      setTask(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to fetch tasks");
    }
  };

  const getUsersCount = async () => {
    try {
      const { data } = await axiosInstance.get(userUrl.count);
      setUser(data);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to fetch users");
    }
  };

  const taskData = {
    labels: ["To Do", "In Progress", "Done"],
    datasets: [
      {
        label: "# of Tasks",
        data: [tasks.toDo, tasks.inProgress, tasks.done],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const userData = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "# of Users",
        data: [users.activatedEmployeeCount, users.deactivatedEmployeeCount],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    getTasksCount();

    if (loginData?.userGroup === "Manager") {
      getUsersCount();
    }
  }, [loginData]); // ✅ re-run when loginData changes

  return (
    <div className="py-4">
      <div className="dashboard-header px-3 py-5 rounded-3 mb-4">
        <div className="header-content py-4">
          <h1 className="text-light">
            Welcome{" "}
            <span style={{ color: "#EF9B28" }}>
              {loginData ? loginData.userName : "Guest"}
            </span>
          </h1>
          <p className="text-light fs-4">
            You can add project and assign tasks to your team
          </p>
        </div>
      </div>
      <div
        className={`  ${
          loginData?.userGroup == "Employee" &&
          "d-flex align-items-center justify-content-center Employee-card"
        }`}
      >
        <div
          className={`content  ${
            loginData?.userGroup == "Employee" ? "w-75 demo " : "row"
          } `}
        >
          <div className="container-fluid dashboard-chart mb-3 d-flex flex-wrap justify-content-between gap-3">
            {/* ✅ Tasks Section */}
            <div
              className={`content-task ${
                loginData?.userGroup == "Employee" ? "w-100" : "col-md-6 "
              }  bg-light shadow-lg rounded-3`}
            >
              <div className="text px-2">
                <span className="fw-bold">Tasks</span>
                <p className="m-0 text-muted">
                  Lorem ipsum dolor sit amet, consecteture
                </p>
              </div>

              <div className="product px-3 py-4 d-flex justify-content-center gap-3 align-items-center">
                <div
                  className="item py-2 text-center rounded-4 d-flex flex-column"
                  style={{ backgroundColor: "#E5E6F4" }}
                >
                  <span
                    className="mx-auto item-card d-flex align-items-center mb-2 justify-content-center"
                    style={{ backgroundColor: "#CFD1EC" }}
                  >
                    <LuChartBarBig size={20} />
                  </span>
                  <span className="text-muted">To Do</span>
                  <span className="fw-bold">{tasks.toDo}</span>
                </div>

                <div
                  className="item py-2 text-center rounded-4 d-flex flex-column"
                  style={{ backgroundColor: "#F4F4E5" }}
                >
                  <span
                    className="mx-auto item-card d-flex align-items-center mb-2 justify-content-center"
                    style={{ backgroundColor: "#E4E4BC" }}
                  >
                    <FaTasks size={20} />
                  </span>
                  <span className="text-muted">Progress</span>
                  <span className="fw-bold">{tasks.inProgress}</span>
                </div>

                <div
                  className="item py-2 text-center rounded-4 d-flex flex-column"
                  style={{ backgroundColor: "#F4E5ED" }}
                >
                  <span
                    className="mx-auto item-card d-flex align-items-center mb-2 justify-content-center"
                    style={{ backgroundColor: "#E7C3D7" }}
                  >
                    <GoProjectSymlink size={20} />
                  </span>
                  <span className="text-muted">Done</span>
                  <span className="fw-bold">{tasks.done}</span>
                </div>
              </div>
            </div>

            {/* ✅ Users Section (Manager only) */}
            {loginData?.userGroup === "Manager" && (
              <div className="content-Users col-md-5 bg-light shadow-lg rounded-3">
                <div className="text px-2">
                  <span className="fw-bold">Users</span>
                  <p className="m-0 text-muted">
                    Lorem ipsum dolor sit amet, consecteture
                  </p>
                </div>

                <div className="product p-3 d-flex justify-content-center gap-3 align-items-center">
                  <div
                    className="item py-2 text-center rounded-4 d-flex flex-column"
                    style={{ backgroundColor: "#E5E6F4" }}
                  >
                    <span
                      className="mx-auto item-card d-flex align-items-center mb-2 justify-content-center"
                      style={{ backgroundColor: "#CFD1EC" }}
                    >
                      <LuChartBarBig size={20} />
                    </span>
                    <span className="text-muted">Active</span>
                    <span className="fw-bold">
                      {users.activatedEmployeeCount}
                    </span>
                  </div>

                  <div
                    className="item py-2 text-center rounded-4 d-flex flex-column"
                    style={{ backgroundColor: "#F4F4E5" }}
                  >
                    <span
                      className="mx-auto item-card d-flex align-items-center mb-2 justify-content-center"
                      style={{ backgroundColor: "#E4E4BC" }}
                    >
                      <BiTask size={20} />
                    </span>
                    <span className="text-muted">Inactive</span>
                    <span className="fw-bold">
                      {users.deactivatedEmployeeCount}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ✅ Charts Section */}
        <div
          className={`chart-section    mt-4 ${
            loginData?.userGroup == "Employee" ? "w-50" : "row"
          }   `}
        >
          <div className="container-fluid chart-item d-flex gap-4 justify-content-center align-items-center">
            <div className="">
              <Pie data={taskData} />
            </div>

            {loginData?.userGroup === "Manager" && (
              <div className="col-md-4">
                <Pie data={userData} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
