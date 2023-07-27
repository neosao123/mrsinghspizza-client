import React from 'react'
import Header from '../components/_main/Header';
import HeroSlider from '../components/_main/Carousel/HeroSlider';

import Footer from '../components/_main/Footer';

const Home = () => {
    return (
        <>
            <Header />
            
            <HeroSlider />
            
            <section className="cat-sec new-block">
                <div className="container-fluid pd0">
                    <div className="cat-block">
                        <div className="block-stl1 bg1">
                            <span className="flaticon-pizza"></span>
                            <h4>Pizza</h4>
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
                            <div className="col-lg-12">
                                <div className="title">
                                    <p className="top-h">today special</p>
                                    <h2>festive season offers</h2>
                                    <div className="btm-style"><span><img src="images/btm-style.png" alt="" className="img-fluid" /></span></div>
                                </div>
                            </div>
                            <div className="col-lg-12 pd0">
                                <div className="special-offer-block ol_flr new-block">
                                    <div className="ol_flr">
                                        <div className="nav btn-filter-wrap">
                                            <button id="js-filter-0" className="filterer btn"><span>Chicken</span></button>
                                            <button id="js-filter-1" className="filterer btn"><span>Meats</span></button>
                                            <button id="js-filter-2" className="filterer btn"><span>Populars all in Domnoo</span></button>
                                            <button id="js-filter-3" className="filterer btn"><span>Veggie</span></button>
                                            <button id="js-filter-4" className="filterer btn"><span>Burgers</span></button>
                                        </div>
                                        <div className="clearfix"></div>
                                        <div className="slider-flr" id="filter_itm1">
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img1.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-meats">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img2.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-populars">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img3.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img4.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-veggie">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img5.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img3.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-burgers">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img5.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img1.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-chicken">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-burgers">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img3.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-meats">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-meats">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img1.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <a href="product_single.html" className="btn4">About More</a>
                                                        <a href="shopping_cart.html" className="btn1 stl2">Add to Cart</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="js-filter-meats">
                                                <div className="block-stl2">
                                                    <div className="img-holder">
                                                        <img src="images/img.png" alt="" className="img-fluid" />
                                                    </div>
                                                    <div className="text-block">
                                                        <h3>Veggie Supreme</h3>
                                                        <p className="sz">Size : Regular</p>
                                                        <p className="price"><span>$6.00</span> <del>$8.00 40% off</del></p>
                                                    </div>
                                                    <div className="btn-sec">
                                                        <button type="button" className="btn1 stl2">Add to Cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="clearfix"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default Home