import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext"; // Adjust the import path as needed

const UserProfile = () => {
  // 1. Consume the context to get user data and logout function
  const authContext = useContext(AuthContext);

  // Show a loading state or return null if context is not yet available
  if (!authContext || !authContext.loginData) {
    return (
      <div className="container text-center py-5">
        <p>Loading user profile...</p>
      </div>
    );
  }

  const { loginData, logOut } = authContext!;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-dark text-white text-center">
              <h2 className="h4 mb-0">User Profile</h2>
            </div>
            <div className="card-body p-4">
              <div className="text-center mb-4">
                {/* You can add a profile picture here */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  fill="currentColor"
                  className="bi bi-person-circle text-secondary"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Username:</strong>
                  <span>{loginData?.userName}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Email:</strong>
                  <span className="text-muted">{loginData?.userEmail}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  <strong>Group:</strong>
                  {/* Display the userGroup from the token */}
                  <span className="badge bg-primary rounded-pill">
                    {loginData?.userGroup}
                  </span>
                </li>
                <li className="list-group-item">
                  <strong>Roles:</strong>
                  <div className="mt-2">
                    {/* Map over the roles and display them as badges */}
                    {loginData?.roles &&
                      loginData?.roles.map((role) => (
                        <span
                          key={role}
                          className="badge bg-secondary me-1 mb-1"
                        >
                          {role}
                        </span>
                      ))}
                  </div>
                </li>
              </ul>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-danger" onClick={logOut}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
