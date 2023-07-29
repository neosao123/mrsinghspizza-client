import React, { useEffect, useState } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import SpecialPizzaSelection from "../components/_main/SpecialPizzaSelection";
import { useParams } from "react-router-dom";
import { getDips, getSpecialDetails } from "../services";
import { data } from "jquery";
import pizzaImage from "../assets/images/pz.png";

function SpecialMenu() {
  const { sid } = useParams();
  const [getSpecialData, setGetSpecialData] = useState();
  const [dipsData, setDipsData] = useState();

  const getSpecial = async () => {
    await getSpecialDetails({ code: sid }).then((res) => {
      setGetSpecialData(res.data);
    });
  };

  const dips = () => {
    getDips()
      .then((res) => {
        setDipsData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("ERROR From Dips API: ", err);
      });
  };

  useEffect(() => {
    getSpecial();
    dips();
  }, []);
  return (
    <>
      {console.log(getSpecialData)}
      <Header />
      <section className="container-fluid new-block m-0 p-0 w-100">
        {/* Heading */}
        <div className="custmized-main">
          <div className="d-flex justify-content-center align-items-center bg-dark p-3 custmized">
            <h2 className="m-3 text-white">
              <strong>{getSpecialData?.name}</strong>
            </h2>
          </div>
        </div>
        <div className="d-flex justify-content-between w-100">
          {/* Pizza Selection */}
          <div className="pizzaSelection w-75 m-3 p-4">
            {/* Pizza Size */}
            <div className="row mb-3 border-bottom">
              <div className="col-lg-4 col-md-6 col-md-6 mb-3">
                <div className="d-flex flex-row flex-wrap justify-content-start align-items-center w-100">
                  <p className="mb-1">Size :</p>
                  <select className="form-select form-drop mx-4">
                    <option>Large</option>
                    <option>Extra Large</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-12 col-md-6 col-md-6 mb-3">
                <p>
                  Free Toppings :{" "}
                  <span className="mx-4">
                    {getSpecialData?.noofToppings} /{" "}
                    {getSpecialData?.noofToppings}
                  </span>
                </p>
              </div>
            </div>
            {/* Pizza Selection */}
            <SpecialPizzaSelection getSpecialData={getSpecialData} />
            {/* Sides */}
            {getSpecialData?.sides.length === 0 ? (
              ""
            ) : (
              <>
                <div className="p-2 pizza-heading text-center">
                  <h4 className="my-1">Sides</h4>
                </div>
                <div className="row mb-3">
                  <div id="sides" className="mb-3">
                    {getSpecialData?.sides?.map((data) => {
                      return (
                        <div
                          className="p-2 d-flex justify-content-between align-items-center border-bottom"
                          key={data.code}
                        >
                          <span className="mx-2">{data.sideName}</span>
                          <div className="w-50 d-flex justify-content-end">
                            <select className="form-select w-50 mx-4 d-inline-block">
                              {data.lineEntries.map((combination) => {
                                return (
                                  <option
                                    value={combination.code}
                                    key={combination.code}
                                  >
                                    {combination.size} - $ {combination.price}
                                  </option>
                                );
                              })}
                            </select>
                            <button
                              type="button"
                              className="addbtn btn btn-sm px-4 text-white"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {/* Dips */}
            {getSpecialData?.noofDips === "0" ? (
              ""
            ) : (
              <>
                <div className="p-2 pizza-heading text-center">
                  <h4 className="my-1">Dips</h4>
                </div>
                <div className="row mb-3">
                  <div id="dips" className="mb-3">
                    {dipsData?.map((data) => {
                      return (
                        <div className="p-2 d-flex justify-content-between align-items-center border-bottom">
                          <span className="mx-2">{data.dipsName}</span>
                          <div className="w-50 d-flex justify-content-end align-items-center">
                            <input
                              type="number"
                              className="form-control text-end w-25"
                              step={0.0}
                              defaultValue={0}
                            />
                            <span className="mx-4">$ </span>
                            <button
                              type="button"
                              className="addbtn btn btn-sm px-4 text-white"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
            {/* Drinks */}
            <div className="p-2 pizza-heading text-center">
              <h4 className="my-1">Drinks</h4>
            </div>
            <div className="row mb-3">
              <div id="sides" className="mb-3">
                <div className="p-2 d-flex justify-content-between align-items-center border-bottom">
                  <span className="mx-2">Drink Name</span>
                  <div className="w-50 d-flex justify-content-end align-items-center">
                    <input
                      type="number"
                      className="form-control w-25"
                      step={0.0}
                    />
                    <span className="mx-4">$ 10</span>
                    <button
                      type="button"
                      className="addbtn btn btn-sm px-4 text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="p-2 d-flex justify-content-between align-items-center border-bottom">
                  <span className="mx-2">Drink Name</span>
                  <div className="w-50 d-flex justify-content-end align-items-center">
                    <input
                      type="number"
                      className="form-control w-25"
                      step={0.0}
                    />
                    <span className="mx-4">$ 10</span>
                    <button
                      type="button"
                      className="addbtn btn btn-sm px-4 text-white"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total Price and Add To Cart - Button */}
          <div className="w-25 m-3 p-4">
            <div className="d-flex w-100 align-items-center justify-content-center flex-column position-relative">
              <p className="text-drak mb-3 mx-1">
                <strong>$ 45.25</strong>
              </p>
              <button
                type="button"
                className="position-sticky top-0 addtocartbtn w-50 btn btn-sm px-3 py-2 text-white"
              >
                <b>Add to Cart</b>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default SpecialMenu;
