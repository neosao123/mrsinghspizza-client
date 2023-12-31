import React from 'react'
import { NavLink } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


const HeroSlider = () => {
    const fixedBgUrl = '/images/heroslider/slider-bg1.jpg';
    const containerStyle = {
        background: `url(${fixedBgUrl}) no-repeat center center`
    };

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
                                        <h1 className="text-stl1 animate__animated animate__fadeInDown">Create Your Own</h1>
                                        <div className="number-block" data-animation-in="fadeInUp" data-animation-out="animate-out fadeOutRight">
                                            <div className="text-center">
                                                <NavLink href="/create-your-own" className="btn1 stl2">Create</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="img-block img2">
                                        <div className="img-holder animate__animated animate__slideInLeft">
                                            <img src="/images/pz.png" alt="" className="img-fluid" />
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
                                        <h1 className="text-stl1 animate__animated animate__fadeInDown" data-animation-in="lightSpeedIn" data-animation-out="animate-out fadeOutRight">special pizza's and combo's</h1>
                                        <div className="number-block" data-animation-in="fadeInUp" data-animation-out="animate-out fadeOutRight">
                                            <div className="text-center">
                                                <NavLink href="#" className="btn1 stl2">Add to Cart</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="img-block img2">
                                        <div className="img-holder animate__animated animate__slideInLeft">
                                            <img src="/images/pz.png" alt="" className="img-fluid" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel>

        </div>
    )
}

export default HeroSlider