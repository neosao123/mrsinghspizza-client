import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <GlobalContext.Provider
      value={{
        auth: [isAuthenticated, setIsAuthenticated],
        user: [user, setUser],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
