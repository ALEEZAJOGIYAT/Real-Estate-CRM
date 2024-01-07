import { createContext, useContext, useMemo } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiRoutes } from "../../routes/config";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookie] = useCookies();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const login = async ({ email, password }) => {
    let url = apiRoutes.postUser;
    const res = await axios.post(
      url,
      {
        email: email,
        password: password,
      },
      config
    );

    setCookies("token", res.token); // your token
    navigate("/login");
  };

  const logout = () => {
    ["token", "name"].forEach((obj) => removeCookie(obj)); // remove data save in cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  return useContext(UserContext);
};
