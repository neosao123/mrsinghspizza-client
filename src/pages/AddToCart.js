import React from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import "../assets/styles/AddToCart/style.css";
import bgImage from "../assets/images/bg-img.jpg";

function AddToCart() {
  return (
    <>
      <Header />
      <section className="new-block mb-3">
        <div className="container-fluid">
          <div className="row gx-4">
            <div className="col-lg-8 col-md-12 col-sm-12 p-4 mt-3">
              <div className="d-flex justify-content-between w-100 productList mb-1">
                <h3 className="mx-2 mb-3">Product Details</h3>
                <h3 className="mx-4 px-3 mb-3">Price</h3>
              </div>
              <ul className="list-group">
                <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center py-2">
                    <div className="image rounded">
                      <img src={bgImage} alt="" className="rounded" />
                    </div>
                    <div className="mx-4">
                      <h5 className="mb-2">Product Name</h5>
                      <p className="text-secondary mb-2">Large</p>
                      <p className="text-secondary mb-2">
                        Quantity : <span>1</span>
                      </p>
                    </div>
                  </div>
                  <div className="mx-4">
                    <h5 className="d-inline mx-4">$ 27.5</h5>
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
                <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center py-2">
                    <div className="image rounded">
                      <img src={bgImage} alt="" className="rounded" />
                    </div>
                    <div className="mx-4">
                      <h5 className="mb-2">Product Name</h5>
                      <p className="text-secondary mb-2">Large</p>
                      <p className="text-secondary mb-2">
                        Quantity : <span>1</span>
                      </p>
                    </div>
                  </div>
                  <div className="mx-4">
                    <h5 className="d-inline mx-4">$ 27.5</h5>
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
                <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center py-2">
                    <div className="image rounded">
                      <img src={bgImage} alt="" className="rounded" />
                    </div>
                    <div className="mx-4">
                      <h5 className="mb-2">Product Name</h5>
                      <p className="text-secondary mb-2">Large</p>
                      <p className="text-secondary mb-2">
                        Quantity : <span>1</span>
                      </p>
                    </div>
                  </div>
                  <div className="mx-4">
                    <h5 className="d-inline mx-4">$ 27.5</h5>
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 p-4 mt-3">
              <div className="block-stl10 odr-summary">
                <h3>order summary :</h3>
                <ul className="list-unstyled">
                  <li>
                    <span className="ttl">Subtotal</span>{" "}
                    <span className="stts">$145</span>
                  </li>
                  <li>
                    <span className="ttl">Tax</span>{" "}
                    <span className="stts">$10</span>
                  </li>
                  <li>
                    <span className="ttl">Discount</span>{" "}
                    <span className="stts">
                      <del>$40</del>
                    </span>
                  </li>
                </ul>
                <div className="ttl-all">
                  <span className="ttlnm">Total</span>
                  <span className="odr-stts">$110</span>
                </div>
              </div>
              <div className="w-100 text-end">
                <button className="px-5 rounded my-3 py-3 addtocart">
                  Check out
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default AddToCart;
