import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../../../Context/AuthContext";
import { Navigate } from "react-router-dom";

type MyComponentProps = {
  children: ReactNode;
};
export default function ProtectedRoute({ children }: MyComponentProps) {
  const { loginData } = useContext(AuthContext)!;

  if (loginData || localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
