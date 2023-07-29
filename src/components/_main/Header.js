import React from "react";
import { Link } from "react-router-dom";
import appLogo from "../../assets/images/logo.png";
const Header = () => {
  return (
    <header className="new-block main-header">
      <div className="main-nav new-block">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="logo">
                <Link href="home.html">
                  <img src={appLogo} alt="logo" className="img-fluid" />
                </Link>
              </div>
              <Link className="nav-opener">
                <i className="fLinkfa-bars"></i>
              </Link>
              <nav className="nav">
                <ul className="list-unstyled">
                  <li>
                    <Link>Home</Link>
                  </li>
                  <li>
                    <Link>Create Own</Link>
                  </li>
                  <li>
                    <Link>Specials</Link>
                  </li>
                  <li>
                    <Link href="">About</Link>
                  </li>
                  <li>
                    <Link href="">Contact Us</Link>
                  </li>
                  <li>
                    <Link>Login/Signup</Link>
                  </li>
                </ul>
              </nav>
              <div className="nav-right-block">
                <ul className="list-unstyled">
                  <li>
                    <Link>
                      <i className="flaticon-scooter-front-view"></i>
                      <span className="nav-price">$00.00</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
