import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser, logoutUser, getCurrentUser } from "../api/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // wait until /me finishes

  // Load user from backend on refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (err) {
        setUser(null); // no valid session
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 🔹 Login
  const login = async (formData) => {
    const data = await loginUser(formData);
    if (data.user) {
      setUser(data.user);
    }
    return data;
  };

  // 🔹 Register
  const register = async (formData) => {
    const data = await registerUser(formData);
    if (data.user) {
      setUser(data.user);
    }
    return data;
  };

  // 🔹 Logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
