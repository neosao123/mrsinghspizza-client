import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));
  const [payloadEdit, setPayloadEdit] = useState();
  const [url, setUrl] = useState(null);
  const [productType, setProductType] = useState();
  const [settings, setSettings] = useState();
  const [regUser, setRegUser] = useState(
    localStorage.getItem("registeredUser")
  );

  return (
    <GlobalContext.Provider
      value={{
        auth: [isAuthenticated, setIsAuthenticated],
        user: [user, setUser],
        regUser: [regUser, setRegUser],
        cart: [cart, setCart],
        productEdit: [payloadEdit, setPayloadEdit],
        urlPath: [url, setUrl],
        productType: [productType, setProductType],
        settings: [settings, setSettings],
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
