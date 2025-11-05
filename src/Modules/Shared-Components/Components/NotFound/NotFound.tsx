import { Link } from "react-router-dom";
import { ROUTES } from "../routes/routes";

const NotFound: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "5rem", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ marginBottom: "2rem" }}>
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={ROUTES.DASHBOARD}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
