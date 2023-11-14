import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="main-footer new-block">
        <div className="container">
          <div className="row gx-5">
            <div className="col-lg-8 col-md-7 col-sm-12 col-xs-12">
              <div className="footer-head">
                <h3>About Us :</h3>
              </div>
              <div className="footer-content">
                <p style={{ textAlign: "justify", textJustify: "inter-word" }}>
                  Welcome to MrSinghs Pizza, where passion for great taste meets
                  the joy of a healthier choice. We believe that delicious food
                  doesn't have to compromise your values or well-being. we are
                  committed to crafting the finest vegetarian pizzas that not
                  only tantalize your taste buds but also nourish your body with
                  the goodness of nature.
                </p>
                {/* <Link className="link">Read More</Link> */}
                {/* <ul className="list-unstyled card-block">
                  <li>
                    <Link href="#">
                      <img src="images/crt1.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src="images/crt2.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src="images/crt3.png" alt="" />
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <img src="images/crt4.png" alt="" />
                    </Link>
                  </li>
                </ul> */}
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
              <div className="our-company">
                <div className="footer-head">
                  <h3>Our Company :</h3>
                </div>
                <div className="footer-content">
                  <ul className="list-unstyled">
                    <li>
                      <Link to="#">Specials</Link>
                    </li>
                    <li>
                      <Link to="#">Subs</Link>
                    </li>
                    <li>
                      <Link to="#">Poutines</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            <div className="col-lg-4 col-md-5 col-sm-12 col-xs-12">
              <div className="footer-head">
                <h3>Contact Us :</h3>
              </div>
              <div className="footer-content">
                <ul className="list-unstyled">
                  <li>
                    <Link to="mailto:contact@mrsinghspizza.com?subject=Contact">
                      contact@mrsinghspizza.com
                    </Link>
                  </li>
                  <li>
                    <Link to="tel:+19055004000">+1 905-500-4000</Link>
                  </li>
                  <li>
                    <p className="text-white mb-2">
                      <strong> Brampton : </strong>
                    </p>
                    <Link>
                      2120 N Part Dr Unit # 25, Brampton, ON, L6S0C9, Canada
                    </Link>
                  </li>
                  <li>
                    <p className="text-white mb-2">
                      <strong> Mississauga : </strong>
                    </p>
                    <Link>5920 Turney Dr, Mississauga, ON, L5M2R8, Canada</Link>
                  </li>
                  <li>
                    <p className="text-white mb-2">
                      <strong> Malton : </strong>
                    </p>
                    <Link>
                      7040 A Airport Rd, Mississauga, ON, L4T2G8, Canada
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copy-right">
        <div className="container">
          <p>
            <Link to="#">Mr. Singhs Pizza</Link> - All Rights Reserved Design
          </p>
          <ul className="social-nav">
            {/* <li>
              <Link to="#">
                <FiTwitter />
              </Link>
            </li> */}
            <li>
              <Link
                target="_blank"
                to="https://www.instagram.com/mrsinghspizzacanada/?next=https%3A%2F%2Fwww.instagram.com%2Fdirect%2Finbox%2F%3F__coig_login%3D1"
              >
                <FiInstagram />
              </Link>
            </li>
            {/* <li>
              <Link to="#">
                <FiFacebook />
              </Link>
            </li> */}
            {/* <li>
              <Link to="#">
                <FiYoutube />
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
