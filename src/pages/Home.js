import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/_main/Header";
import HeroSlider from "../components/_main/Carousel/HeroSlider";
import Footer from "../components/_main/Footer";
import { Link } from "react-router-dom";
import SpecialMenuList from "../components/_main/SpecialMenuList";
import pizzaImage from "../assets/images/pz.png";
import DrinkMenu from "./DrinkMenu";
import DipsMenu from "./DipsMenu";
import SidesMenu from "./SidesMenu";
import GlobalContext from "../context/GlobalContext";
import CartFunction from "../components/cart";

const Home = () => {
  // Global Context
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  // Helper Function
  const cartFn = new CartFunction();
  // useRef
  const createYourOwnTabsRef = useRef(null);
  const specialTabRef = useRef(null);
  const sidesTabRef = useRef(null);
  const dipsTabRef = useRef(null);
  const drinksTabRef = useRef(null);

  // Handle Product Click
  const handleProductClick = (productType) => {
    switch (productType) {
      case "customized":
        createYourOwnTabsRef.current.click();
        break;
      case "special":
        specialTabRef.current.click();
        specialTabRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "sides":
        sidesTabRef.current.click();
        sidesTabRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "dips":
        dipsTabRef.current.click();
        dipsTabRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      case "drinks":
        drinksTabRef.current.click();
        drinksTabRef.current.scrollIntoView({ behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    cartFn.createCart(setCart);
  }, [setCart]);

  return (
    <div style={{ position: "relative", overflow: "initial" }}>
      <Header onProductClick={handleProductClick} />

      <HeroSlider onProductClick={handleProductClick} />

      <section className="special-offers-sec new-block">
        <div className="special-offer-inr-block new-block">
          <div className="container-fluid">
            <div className="row">
              {/* Title */}
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

              {/* Tabs & Tabs-Content */}
              <div className="col-lg-12 pd0">
                <div className="special-offer-block ol_flr new-block">
                  {/* Tabs */}
                  <div className="ol_flr cat-sec mb-3 nav nav-tabs">
                    <ul
                      className="cat-sec nav nav-tabs mt-2 d-flex justify-content-between"
                      role="tablist"
                    >
                      {/* Create Your Own - Tab */}
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          ref={createYourOwnTabsRef}
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

                      {/* Special Pizza - Tab */}
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          ref={specialTabRef}
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

                      {/* Sides - Tab */}
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          ref={sidesTabRef}
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

                      {/* Dips - Tab */}
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          ref={dipsTabRef}
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

                      {/* Drinks - Tab */}
                      <li className="nav-item cat-block d-flex justify-content-center aling-items-center">
                        <button
                          ref={drinksTabRef}
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
                      <DrinkMenu />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
