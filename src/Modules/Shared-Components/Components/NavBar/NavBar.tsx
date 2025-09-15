import React, { useContext } from "react";
import profile from "../../../../assets/Ellipse 18.png";
import logo from "../../../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { IoMdNotifications } from "react-icons/io";
import { FaUserCircle, FaSignOutAlt, FaHome, FaUsers } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { BsListTask } from "react-icons/bs";
import { ROUTES } from "../routes/routes";

export default function NavBar() {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) {
    return null;
  }

  const { loginData, logOut } = authContext;

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" to={ROUTES.DASHBOARD}>
            <img src={logo} alt="pms-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* Mobile-Only Sidebar Links */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-lg-none">
              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center gap-2 ${
                    location.pathname === "/dashboard" ? "active" : ""
                  }`}
                  to={ROUTES.DASHBOARD}
                >
                  <FaHome /> Home
                </Link>
              </li>
              {loginData?.userGroup === "Manager" && (
                <li className="nav-item">
                  <Link
                    className={`nav-link d-flex align-items-center gap-2 ${
                      location.pathname === "/dashboard/user" ? "active" : ""
                    }`}
                    to={ROUTES.Users.slice(1)}
                  >
                    <FaUsers /> Users
                  </Link>
                </li>
              )}
              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center gap-2 ${
                    location.pathname === "/dashboard/project-list"
                      ? "active"
                      : ""
                  }`}
                  to={ROUTES.Projects_List.slice(1)}
                >
                  <GrProjects /> Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link d-flex align-items-center gap-2 ${
                    location.pathname.includes("/task") ? "active" : ""
                  }`}
                  to={
                    loginData?.userGroup === "Manager"
                      ? ROUTES.Tasks_List.slice(1)
                      : ROUTES.EmployeeTask.slice(1)
                  }
                >
                  <BsListTask /> Tasks
                </Link>
              </li>
            </ul>

            {/* Right-side Navbar Items */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li>
                <hr className="d-lg-none" />
              </li>

              <li className="nav-item me-3">
                <IoMdNotifications size={24} color="#EF9B28" />
              </li>

              {/* ✅ 1. DESKTOP-ONLY DROPDOWN */}
              {/* This entire dropdown is now hidden on screens smaller than 'lg' */}
              <li className="nav-item dropdown border-lg-start ps-lg-2 d-none d-lg-flex align-items-center">
                <Link
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={profile}
                    alt="userProfile-img"
                    className="rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <span>{loginData ? loginData?.userName : "Guest"}</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link
                      className="dropdown-item d-flex align-items-center gap-2"
                      to={`/dashboard${ROUTES.PROFILE}`}
                    >
                      <FaUserCircle />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={logOut}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </li>
                </ul>
              </li>

              {/* ✅ 2. MOBILE-ONLY LINKS */}
              {/* These list items will only appear on screens smaller than 'lg' */}
              <li className="nav-item d-lg-none">
                <Link
                  className="nav-link d-flex align-items-center gap-2"
                  to={`/dashboard${ROUTES.PROFILE}`}
                >
                  <FaUserCircle /> Profile
                </Link>
              </li>
              <li className="nav-item d-lg-none">
                <button
                  className="nav-link d-flex align-items-center gap-2"
                  onClick={logOut}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
