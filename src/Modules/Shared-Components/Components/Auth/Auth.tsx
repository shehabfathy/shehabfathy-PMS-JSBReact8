// Auth.tsx
import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="auth-container vh-100 overflow-hidden">
      <Outlet />;
    </div>
  );
}
