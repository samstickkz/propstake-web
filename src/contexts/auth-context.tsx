"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { getCookie, setCookie, deleteCookie } from "cookies-next"; // Ensure 'cookies-next' is installed

interface User {
  role: "attendees" | "administrator" | null;
}

interface AuthContextType {
  user: User | null;
  login: (role: "attendees" | "administrator") => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load user from cookies safely
    const storedUser = getCookie("user");

    if (storedUser && typeof storedUser === "string") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user cookie:", error);
      }
    }
  }, []);

  const login = (role: "attendees" | "administrator") => {
    const userData = { role };

    // Store user in cookies (instead of localStorage)
    setCookie("user", JSON.stringify(userData), { path: "/", secure: true });

    setUser(userData);

    // Redirect to the correct dashboard
    router.push(
      role === "attendees" ? "/dashboard/attendees" : "/dashboard/administrator"
    );
  };

  const logout = () => {
    deleteCookie("user");
    setUser(null);
    router.push("/auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
