import { jwtDecode } from "jwt-decode";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface DecodedToken {
  id: string;
  email: string;
  exp: number;
  iat: number;
  // add other fields your token includes
}

interface AuthContextType {
  loginData: DecodedToken | null;
  logOut: () => void;
  getUser: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loginData, setLoginData] = useState<DecodedToken | null>(null);

  function getUser() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode<DecodedToken>(token);
        setLoginData(decoded);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token", error);
        logOut();
      }
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setLoginData(null);
    <Navigate to="/login" />; // ✅ redirect correctly
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
