import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import appLogo from "../../assets/images/logo.png";
import GlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
const Header = () => {
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  const [cart, setCart] = globalCtx.cart;

  const navigate = useNavigate();

  const handleLogout = () => {
    if (isAuthenticated !== false) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      toast.success("Logged Out successfully");
      setTimeout(() => {
        setIsAuthenticated(false);
        setUser({});
        navigate("/");
      }, 500);
    }
  };

  return (
    <div className="position-sticky top-0">
      <header className="new-block main-header">
        <div className="main-nav new-block">
          <div className="container-fluid ">
            <div className="row">
              <div className="col-lg-12">
                <div className="logo">
                  <Link>
                    <img src={appLogo} alt="logo" className="img-fluid" />
                  </Link>
                </div>
                <Link className="nav-opener">
                  <i className="fLinkfa-bars"></i>
                </Link>
                <nav className="nav">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="">Sides</Link>
                    </li>
                    <li>
                      <Link to="">Dips</Link>
                    </li>
                    <li>
                      <Link to="">Drinks</Link>
                    </li>
                    <li>
                      <Link to="">About</Link>
                    </li>
                    <li>
                      <Link to="">Contact Us</Link>
                    </li>
                    <li onClick={handleLogout}>
                      <Link to={isAuthenticated === false ? "/login" : "/"}>
                        {isAuthenticated === false
                          ? "Login / Signup"
                          : "Logout"}
                      </Link>
                    </li>
                  </ul>
                </nav>
                <div className="nav-right-block">
                  <ul className="list-unstyled">
                    <li>
                      <Link
                        to="/addtocart"
                        className="text-decoration-none py-3 px-1"
                      >
                        <i className="flaticon-scooter-front-view"></i>
                        <span className="nav-price">
                          $
                          {cart?.grandtotal
                            ? cart?.grandtotal
                            : (0.0).toFixed(2)}
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
