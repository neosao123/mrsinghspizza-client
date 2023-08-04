import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  return (
    <GlobalContext.Provider
      value={{
        auth: [isAuthenticated, setIsAuthenticated],
        user: [user, setUser],
        cart: [cart, setCart],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
