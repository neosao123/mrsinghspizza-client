import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../components/_main/Header";
import HeroSlider from "../components/_main/Carousel/HeroSlider";

import Footer from "../components/_main/Footer";
import { Link, NavLink } from "react-router-dom";
import SidesMenu from "../components/_main/SidesMenu";
import DipsMenu from "../components/_main/DipsMenu";
import DrinksMenu from "../components/_main/DrinksMenu";
import SpecialMenuList from "../components/_main/SpecialMenuList";
import pizzaImage from "../assets/images/pz.png";

const Home = () => {
  const [longitude, setLongitude] = useState();
  const [latitude, setLattitude] = useState();

  const getLocation = () => {
    if (navigator.geolocation) {
      console.log(navigator.geolocation);
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLattitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        function (error) {
          console.log("error code :", error.code);
        }
      );
    } else {
      console.log("Geolocation is not supported");
    }
  };

  
  useEffect(() => {
    getLocation();
    localStorage.setItem("latitude", latitude);
    localStorage.setItem("longitude", longitude);
  }, []);

  return (
    <>
      <Header />

      <HeroSlider />

      <section className="cat-sec new-block d-none">
        <div className="container-fluid pd0">
          <div className="cat-block">
            <div className="block-stl1 bg1">
              <span className="flaticon-pizza"></span>
              <h4>Create Your Own</h4>
            </div>
          </div>
          <div className="cat-block">
            <div className="block-stl1 bg2">
              <span className="flaticon-burger"></span>
              <h4>Specials</h4>
            </div>
          </div>
          <div className="cat-block">
            <div className="block-stl1 bg3">
              <span className="flaticon-fried-chicken"></span>
              <h4>Sides</h4>
            </div>
          </div>
          <div className="cat-block">
            <div className="block-stl1 bg6">
              <span className="flaticon-drink"></span>
              <h4>Drinks</h4>
            </div>
          </div>
          <div className="cat-block">
            <div className="block-stl1 bg7">
              <span className="flaticon-taco"></span>
              <h4>Dips</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="special-offers-sec new-block">
        <div className="special-offer-inr-block new-block">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 p-4">
                <div className="title">
                  <p className="top-h">today special</p>
                  <h2>festive season offers</h2>
                  <div className="btm-style">
                    <span>
                      <img
                        src="images/btm-style.png"
                        alt=""
                        className="img-fluid"
                      />
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 pd0">
                <div className="special-offer-block ol_flr new-block">
                  <div className="ol_flr cat-sec mb-3 nav nav-tabs">
                    <ul
                      className="cat-sec nav nav-tabs mt-2 d-flex justify-content-between"
                      role="tablist"
                    >
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          aria-controls="home"
                          aria-selected="true"
                          data-bs-target="#createYourOwn"
                          data-bs-toggle="tab"
                          className="block-stl1 p-4 bg1 nav-link active "
                          id="createyourown-tab"
                          type="button"
                          role="tab"
                        >
                          <span>Create Your Own</span>
                        </button>
                      </li>
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          className="block-stl1 p-4 bg1 nav-link btn"
                          id="special-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#special"
                          type="button"
                          role="tab"
                          aria-controls="special"
                          aria-selected="false"
                        >
                          <span>Specials</span>
                        </button>
                      </li>

                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          data-bs-target="#sides"
                          data-bs-toggle="tab"
                          className="block-stl1 p-4 bg1 nav-link btn"
                          id="sides-tab"
                          type="button"
                          role="tab"
                          aria-controls="sides"
                          aria-selected="false"
                        >
                          <span>Sides</span>
                        </button>
                      </li>
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          data-bs-target="#dips"
                          data-bs-toggle="tab"
                          className="block-stl1 p-4 bg1 nav-link btn"
                          id="dips-tab"
                          type="button"
                          role="tab"
                          aria-controls="dips"
                          aria-selected="false"
                        >
                          <span>Dips</span>
                        </button>
                      </li>
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          data-bs-target="#drinks"
                          data-bs-toggle="tab"
                          className="block-stl1 p-4 bg1 nav-link btn"
                          id="drinks-tab"
                          type="button"
                          role="tab"
                          aria-controls="drinks"
                          aria-selected="false"
                        >
                          <span>Drinks</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                  {/* Tabs Content */}
                  <div
                    className="tab-content d-flex justify-content-center p-4"
                    style={{ width: "100%" }}
                  >
                    {/* Create Your Own List */}
                    <div
                      className="tab-pane show active w-100"
                      id="createYourOwn"
                      role="tabpanel"
                      aria-labelledby="creatyourown-tab"
                    >
                      <div className="row gx-4 d-flex justify-content-center mt-3 mb-3">
                        <div className="col-lg-3 col-md-4 col-sm-12 mb-3">
                          <div className="text-center p-3 box">
                            <div className="d-flex justify-content-center mb-3">
                              <div className="image-div d-flex justify-content-center">
                                <img
                                  src={pizzaImage}
                                  alt=""
                                  className="img-fluid image"
                                />
                              </div>
                            </div>
                            <div className="customizedTitle mb-3">
                              <h3 className="mb-1">Customize Pizza</h3>
                              <p className="pizzasize text-secondary mb-1">
                                Size : Large / Extra Large
                              </p>
                            </div>
                            <div className="">
                              <Link
                                to={"/create-your-own"}
                                className="customizedBtn btn btn-sm px-4 py-2 text-white"
                              >
                                Customize
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Special Pizza List */}
                    <div
                      className="tab-pane w-100"
                      id="special"
                      role="tabpanel"
                      aria-labelledby="special-tab"
                    >
                      <SpecialMenuList />
                    </div>
                    {/* Sides Menu */}
                    <div
                      className="tab-pane w-100"
                      id="sides"
                      role="tabpanel"
                      aria-labelledby="sides-tab"
                    >
                      <SidesMenu />
                    </div>
                    {/* Dips Menu */}
                    <div
                      className="tab-pane w-100"
                      id="dips"
                      role="tabpanel"
                      aria-labelledby="dips-tab"
                    >
                      <DipsMenu />
                    </div>
                    {/* Drinks Menu */}
                    <div
                      className="tab-pane w-100"
                      id="drinks"
                      role="tabpanel"
                      aria-labelledby="drinks-tab"
                    >
                      <DrinksMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;
