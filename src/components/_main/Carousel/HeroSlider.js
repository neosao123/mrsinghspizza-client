import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import bgSlider from "../../../assets/images/slider-bg1.jpg";
import pizzaImage from "../../../assets/images/pz.png";

const HeroSlider = ({ onProductClick }) => {
  const fixedBgUrl = bgSlider;
  const containerStyle = {
    background: `url(${fixedBgUrl}) no-repeat center center`,
  };

  const [productType, setProductType] = useState();
  useEffect(() => {
    if (productType && productType !== null) {
      onProductClick(productType);
    }
  }, [productType]);

  return (
    <div className="banner slider1 new-block">
      <div className="fixed-bg" style={containerStyle}></div>
      <OwlCarousel
        className="slider owl-carousel owl-theme"
        autoplay={true}
        autoplayTimeout={5000}
        loop={true}
        margin={10}
        nav={true}
        dots={false}
        rewind={true}
        responsive={{
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        }}
      >
        <div className="item">
          <div className="slider-block slide1 new-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="text-block">
                    <h1 className="text-stl1 animate__animated animate__fadeInDown">
                      Create Your Own
                    </h1>
                    <div
                      className="number-block"
                      data-animation-in="fadeInUp"
                      data-animation-out="animate-out fadeOutRight"
                    >
                      <div className="text-center">
                        <Link
                          to="/create-your-own"
                          className="btn1 stl2 text-decoration-none"
                        >
                          Create
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="img-block img2">
                    <div className="img-holder animate__animated animate__slideInLeft">
                      <img src={pizzaImage} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="slider-block slide1 new-block">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="text-block">
                    <h1
                      className="text-stl1 animate__animated animate__fadeInDown"
                      data-animation-in="lightSpeedIn"
                      data-animation-out="animate-out fadeOutRight"
                    >
                      special pizza's and combo's
                    </h1>
                    <div
                      className="number-block"
                      data-animation-in="fadeInUp"
                      data-animation-out="animate-out fadeOutRight"
                    >
                      <div className="text-center">
                        <Link
                          className="btn1 stl2 text-decoration-none"
                          onClick={() => {
                            setProductType("special");
                          }}
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="img-block img2">
                    <div className="img-holder animate__animated animate__slideInLeft">
                      <img src={pizzaImage} alt="" className="img-fluid" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </OwlCarousel>
    </div>
  );
};

export default HeroSlider;
