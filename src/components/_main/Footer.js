import React from "react";
import { Link } from "react-router-dom";
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="main-footer new-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-5 col-sm-12 col-xs-12">
              <div className="footer-head">
                <h3>About Us :</h3>
              </div>
              <div className="footer-content">
                <p>
                  Donec tincidunt, augue a convallis cursus, sapien eros
                  efficitur sem in placerat sapien est nec quam.
                </p>
                <Link className="link">Read More</Link>
                <ul className="list-unstyled card-block">
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
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12">
              <div className="our-company">
                <div className="footer-head">
                  <h3>Our Company :</h3>
                </div>
                <div className="footer-content">
                  <ul className="list-unstyled">
                    <li>
                      <Link href="#">Specials</Link>
                    </li>
                    <li>
                      <Link href="#">Subs</Link>
                    </li>
                    <li>
                      <Link href="#">Poutines</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-6 col-xs-12">
              <div className="footer-head">
                <h3>Contact Us :</h3>
              </div>
              <div className="footer-content">
                <ul className="list-unstyled">
                  <li>
                    <Link href="mailto:contact@mrsinghspizza.com?subject=Contact">
                      contact@mrsinghspizza.com
                    </Link>
                  </li>
                  <li>
                    <Link href="tel:+150598636">(+1) 505-98636</Link>
                  </li>
                  <li>
                    <Link>101, Your, Sample, Address, Canada</Link>
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
            <Link href="#">Mr. Singhs Pizza</Link> - All Rights Reserved Design
          </p>
          <ul className="social-nav">
            <li>
              <Link href="#">
                <FiTwitter />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FiInstagram />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FiFacebook />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FiYoutube />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
