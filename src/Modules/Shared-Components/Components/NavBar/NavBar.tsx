import React, { useContext } from "react";
import profile from "../../../../assets/Ellipse 18.png";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { IoMdNotifications } from "react-icons/io";
// Import the icons for the dropdown
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { ROUTES } from "../routes/routes";

export default function NavBar() {
  // Destructure logOut function from the context as well
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Or a loading spinner
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
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
              <li className="nav-item me-3">
                <IoMdNotifications size={24} color="#EF9B28" />
              </li>
              <li className="nav-item dropdown border-start ps-2">
                <Link
                  className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                  to="#" // The link itself doesn't navigate
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
                {/* Updated Dropdown Menu */}
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
