import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext<AuthContextType | null>(null);

type LoginData = {
  userName: string;
  userEmail: string;
  userId: number;
  exp: number;
  userGroup: string;
};

type AuthContextType = {
  loginData: LoginData | null;
  logOut: () => void;
  getUser: () => void;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<LoginData | null>(null);

  function getUser() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: LoginData = jwtDecode(token);
        console.log(decoded);
        setLoginData(decoded);
      } catch (error) {
        const err = error as { message: string };
        toast.error(err.message || "Invalid token");
        logOut();
      }
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />;
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
