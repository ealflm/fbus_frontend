import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../configs/baseURL";
import jwtDecode from "jwt-decode";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage(LOCAL_STORAGE_KEY.TOKEN, null);
  const navigate = useNavigate();

  const setLocalStoragelogin = async (data) => {
    setToken(data);
    navigate("/dashboard", { replace: true });
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
    navigate("/login", { replace: true });
  };
  if (token !== null) {
    const { exp } = jwtDecode(token);
    const expirationTime = exp * 1000 - 60000;
    if (Date.now() >= expirationTime) {
      logout();
    }
  }
  const value = useMemo(
    () => ({
      token,
      setLocalStoragelogin,
      logout,
    }),
    [token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
