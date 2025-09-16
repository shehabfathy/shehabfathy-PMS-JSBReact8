import * as jwt from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

// Destructure jwtDecode so you can use it like { jwtDecode }
const { jwtDecode } = jwt;

/** ---------- Types ---------- */
type LoginData = {
  userName: string;
  userEmail: string;
  userId: number;
  userGroup?: string;
  roles?: string[];
  exp?: number;
};

type AuthContextType = {
  loginData: LoginData | null;
  logOut: () => void;
  getUser: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

/** ---------- Provider ---------- */
export function AuthContextProvider({ children }: Props) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  function getUser() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode<LoginData>(token);
      setLoginData(decoded);
    } catch (err) {
      const e = err as { message?: string };
      toast.error(e.message || "Invalid token");
      logOut();
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />; // trigger redirect
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUser();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loginData, logOut, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}
