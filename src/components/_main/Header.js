import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import appLogo from "../../assets/images/logo.png";
import GlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/authProvider/actionType";
import swal from "sweetalert";
const Header = () => {
  // Global Context
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [user, setUser] = globalCtx.user;
  const [cart, setCart] = globalCtx.cart;
  const [url, setUrl] = globalCtx.urlPath;
  const [productType, setProductType] = globalCtx.productType;
  const [regUser, setRegUser] = globalCtx.regUser;
  //
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dropMenu, setDropMenu] = useState(false);

  console.log(dropMenu);
  // Handle Logout
  const handleLogout = () => {
    if (isAuthenticated !== false) {
      swal({
        title: "Logout Confirmation",
        text: "Do you really want to logout?",
        icon: "warning",
        buttons: ["Cancel", "Logut"],
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          localStorage.removeItem("registeredUser");
          toast.success("Logged Out successfully");
          dispatch({ type: LOGOUT, payload: null });
          setTimeout(() => {
            setIsAuthenticated(false);
            setUser({});
            setRegUser({});
            navigate("/");
          }, 500);
        }
      });
    }
  };

  // useEffect(() => {}, [dropMenu]);

  return (
    <>
      <div className="position-sticky top-0">
        <header className="new-block main-header">
          <div className="main-nav new-block">
            <div className="container-fluid ">
              <div className="row">
                <div className="col-lg-12">
                  <div className="logo my-4 mx-4">
                    <Link>
                      <img src={appLogo} alt="logo" className="img-fluid" />
                    </Link>
                  </div>
                  {/* <Link className="nav-opener py-3">
                    <i class="fa fa-bars" aria-hidden="true"></i>
                  </Link> */}

                  {!dropMenu && (
                    <Link
                      className="nav-opener py-3"
                      onClick={() => setDropMenu(true)}
                      style={{ transition: ".5s all ease-in" }}
                    >
                      <i class="fa fa-bars" aria-hidden="true"></i>
                    </Link>
                  )}
                  {dropMenu && (
                    <Link
                      className="nav-opener py-3"
                      onClick={() => setDropMenu(false)}
                    >
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </Link>
                  )}
                  <nav className="nav">
                    <ul className="list-unstyled">
                      <li className="drop active">
                        <Link className="py-5" to="/">
                          Home
                        </Link>
                      </li>
                      <li className="drop">
                        <Link className="py-5" to="/sides">
                          Sides
                        </Link>
                      </li>
                      <li className="drop">
                        <Link className="py-5" to="/dips">
                          Dips
                        </Link>
                      </li>
                      <li className="drop">
                        <Link className="py-5" to="/drinks">
                          Drinks
                        </Link>
                      </li>
                      <li className="drop">
                        <Link className="py-5" to="/">
                          About
                        </Link>
                      </li>
                      <li className="drop">
                        <Link className="py-5" to="/">
                          Contact Us
                        </Link>
                      </li>
                      <li className="drop" onClick={handleLogout}>
                        <Link
                          className="py-5"
                          to={isAuthenticated === false ? "/login" : "/"}
                        >
                          {isAuthenticated === false
                            ? "Login / Signup"
                            : "Logout"}
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="nav-right-block w-auto px-4 py-4 h-100">
                    <ul className="list-unstyled py-3 my-2">
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

      {dropMenu === true ? (
        <div
          className="w-100 bg-white"
          style={{
            position: "fixed",
            top: "6.5rem",
            zIndex: "1000",
            transition: "1s all ease",
          }}
        >
          <nav className="nav w-100 d-flex justify-content-center">
            <ul className="list-unstyled p-3">
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to="/"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  Home
                </Link>
              </li>
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none  text-dark"
                  to="/sides"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  Sides
                </Link>
              </li>
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to="/dips"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  Dips
                </Link>
              </li>
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to="/drinks"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  Drinks
                </Link>
              </li>
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to="/"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  About
                </Link>
              </li>
              <li className="border-bottom py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to="/"
                  onClick={() => {
                    setDropMenu(false);
                  }}
                >
                  Contact Us
                </Link>
              </li>
              <li onClick={handleLogout} className="py-2">
                <Link
                  className="text-decoration-none text-dark"
                  to={isAuthenticated === false ? "/login" : "/"}
                >
                  {isAuthenticated === false ? "Login / Signup" : "Logout"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
