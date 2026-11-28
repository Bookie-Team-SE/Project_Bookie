
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("bookie_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("bookie_token");
  });

  const login = (data) => {
    const newToken = data.token;
    const newUser = data.user;

    if (!newToken || !newUser) {
      throw new Error("Invalid login response from server.");
    }

    localStorage.setItem("bookie_token", newToken);
    localStorage.setItem("bookie_user", JSON.stringify(newUser));

    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("bookie_token");
    localStorage.removeItem("bookie_user");

    setToken(null);
    setUser(null);
  };

  const updateUser = (newUser) => {
    localStorage.setItem("bookie_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        updateUser,
        isAuthenticated: Boolean(token)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
