import { HashRouter, Route, Routes, json, useNavigate } from "react-router-dom";
import CreateYourOwn from "../pages/CreateYourOwn";
import Home from "../pages/Home";
import SpecialMenu from "../pages/SpecialMenu";
import { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import AuthLayout from "../layouts/AuthLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import Cart from "../pages/Cart";
import AddressDetails from "../pages/AddressDetails";
import Payment from "../pages/Payment";
import Success from "../pages/Payment/Success";
import Cancel from "../pages/Payment/Cancel";
import LoginReg from "../pages/Auth/LoginReg";
import MyAccount from "../pages/Auth/MyAccount";

const AllRoutes = () => {
  const navigate = useNavigate();
  // 9988776646 -- client@123

  const globalctx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalctx.auth;
  const [user, setUser] = globalctx.user;

  // useEffect(() => {
  //   const user = localStorage.getItem("user") ?? null;

  //   if (user != null) {
  //     const userData = JSON.parse(user);
  //     if (userData) {
  //       setIsAuthenticated(true);
  //     } else {
  //       navigate("/login");
  //     }
  //   }
  // }, [setIsAuthenticated, setUser, navigate]);

  return (
    <Routes>
      <Route exact index path="/" Component={Home} />
      <Route exact path="/:ptype" Component={Home} />
      <Route exact path="/login-registration" Component={LoginReg} />
      <Route exact path="/create-your-own/" Component={CreateYourOwn} />
      <Route exact path="/special-pizza/:sid" Component={SpecialMenu} />
      <Route exact path="/addtocart" Component={Cart} />
      <Route exact path="/address-details" Component={AddressDetails} />
      <Route exact path="/card-payment" Component={Payment} />
      <Route exact path="/payment/verify" Component={Success} />
      <Route exact path="/payment/cancel" Component={Cancel} />
      <Route exact path="/my-account" Component={MyAccount} />
    </Routes>
  );
};

export default AllRoutes;
