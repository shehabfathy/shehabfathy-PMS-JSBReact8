import React, { useContext } from "react";
import profile from "../../../../assets/Ellipse 18.png";
import logo from "../../../../assets/logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { IoMdNotifications } from "react-icons/io";

export default function NavBar() {
  const { loginData } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/dashboard">
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
            <ul className="navbar-nav w-25 ms-auto mb-2 mb-lg-0 d-flex  align-items-center">
              <li className="nav-item me-2">
                <IoMdNotifications size={24} color="#EF9B28" />
              </li>
              <li className="nav-item dropdown border-1 border-start">
                <Link
                  className="nav-link dropdown-toggle d-flex justify-content-between align-items-center gap-1"
                  to="/dashboard"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={profile} alt="userProfile-img" />
                  <span>{loginData ? loginData?.userName : "Guest"}</span>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      {loginData ? loginData?.userEmail : "Guest-mail"}
                    </Link>
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
