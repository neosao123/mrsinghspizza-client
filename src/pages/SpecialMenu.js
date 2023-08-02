import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import SpecialPizzaSelection from "../components/_main/SpecialPizzaSelection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDips, getSpecialDetails, getToppings } from "../services";
import LoadingLayout from "../layouts/LoadingLayout";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";

function SpecialMenu() {
  const { sid } = useParams();
  const [getSpecialData, setGetSpecialData] = useState();
  const [dipsData, setDipsData] = useState();
  const [toppingsData, setToppingsData] = useState();
  const [pizzaSize, setPizzaSize] = useState("Large");
  const [loading, setLoading] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const navigate = useNavigate();
  const location = useLocation();

  const handlePrice = async (e) => {
    setPizzaSize(e.target.value);
  };
  const getSpecial = async () => {
    setLoading(true);
    await getSpecialDetails({ code: sid }).then((res) => {
      setGetSpecialData(res.data);
      setLoading(false);
    });
  };
  const dips = async () => {
    setLoading(true);
    await getDips()
      .then((res) => {
        setDipsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR From Special Dips: ", err);
      });
  };
  const toppings = async () => {
    setLoading(true);
    await getToppings()
      .then((res) => {
        setToppingsData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error From toppings Data :", err);
      });
  };

  //Component - Special Pizza Selection
  const spSelection = [];
  for (let i = 1; i <= getSpecialData?.noofPizzas; i++) {
    spSelection.push(
      <SpecialPizzaSelection
        key={i}
        getSpecialData={getSpecialData}
        count={i}
        toppingsData={toppingsData}
      />
    );
  }
  const handlePlaceOrder = () => {
    if (isAuthenticated) {
      toast.success("Order Placed Successfully..");
    } else {
      localStorage.setItem("redirectTo", location?.pathname);
      navigate("/login");
    }
  };

  useEffect(() => {
    getSpecial();
    dips();
    toppings();
  }, []);

  return (
    <div>
      <Header />
      {loading ? (
        <LoadingLayout />
      ) : (
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
            <div className="pizzaSelection w-75 m-3 p-3">
              {/* Pizza Size */}
              <div className="row mb-3 border-bottom">
                <div className="col-lg-4 col-md-6 col-md-6 mb-3">
                  <div className="d-flex flex-row flex-wrap justify-content-start align-items-center w-100">
                    <p className="mb-1">Size :</p>
                    <select
                      className="form-select form-drop mx-4"
                      onChange={(e) => {
                        handlePrice(e);
                      }}
                    >
                      <option value="Large">Large</option>
                      <option value="Extra Large">Extra Large</option>
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
              {spSelection}

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
              {getSpecialData?.noofDips === 0 ? (
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
                          <div
                            className="p-2 d-flex justify-content-between align-items-center border-bottom"
                            key={data.dipsCode}
                          >
                            <span className="mx-2">{data.dipsName}</span>
                            <div className="w-50 d-flex justify-content-end align-items-center">
                              <input
                                type="number"
                                className="form-control text-end w-25"
                                step={0.0}
                                defaultValue={0}
                              />
                              <span className="mx-4">$ {data.price}</span>
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
              {getSpecialData?.pops && getSpecialData?.bottle && (
                <>
                  {(getSpecialData?.pops.length > 0 ||
                    getSpecialData?.bottle.length > 0) && (
                    <div className="p-2 pizza-heading text-center">
                      <h4 className="my-1">Drinks</h4>
                    </div>
                  )}
                  <div className="row mb-3">
                    <div id="sides" className="mb-3">
                      {getSpecialData?.pops.map((data) => {
                        return (
                          <div
                            className="p-2 d-flex justify-content-between align-items-center border-bottom"
                            key={data.code}
                          >
                            <span className="mx-2">{data.softDrinkName}</span>
                            <div className="w-50 d-flex justify-content-end align-items-center">
                              <input
                                type="number"
                                className="form-control w-25"
                                step={0.0}
                                defaultValue={0}
                              />
                              <span className="mx-4">$ {data.price}</span>
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
                      {getSpecialData?.bottle.map((data) => {
                        return (
                          <div
                            className="p-2 d-flex justify-content-between align-items-center border-bottom"
                            key={data.code}
                          >
                            <span className="mx-2">{data.softDrinkName}</span>
                            <div className="w-50 d-flex justify-content-end align-items-center">
                              <input
                                type="number"
                                className="form-control w-25"
                                step={0.0}
                                defaultValue={0}
                              />
                              <span className="mx-4">$ {data.price}</span>
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
            </div>
            {/* Total Price and Add To Cart - Button */}
            <div className="w-25 m-3 p-3">
              <div className="d-flex w-100 align-items-center justify-content-center flex-column position-relative">
                <p className="text-drak mb-3 mx-1">
                  <strong>
                    ${" "}
                    {pizzaSize === "Large"
                      ? getSpecialData?.largePizzaPrice || 0
                      : getSpecialData?.extraLargePizzaPrice || 0}
                  </strong>
                </p>
                <button
                  type="button"
                  className="position-sticky top-0 addtocartbtn w-50 btn btn-sm px-3 py-2 text-white"
                >
                  <b>Add to Cart</b>
                </button>
              </div>

              {/* Cart List */}
              <div className="cartlist w-100 mt-5">
                <h2 className="p-3 text-center orderTitle">Your Orders</h2>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="row m-0 px-1 py-3 list-item">
                  <div className="col-lg-6 mb-2">Product Name</div>
                  <div className="col-lg-6 text-end mb-2">$ 20</div>
                  <div className="col-lg-6 mb-2">
                    <strong>Size :</strong> <span className="mx-2">Large</span>
                  </div>
                  <div className="col-lg-6 text-end mb-2">
                    <strong className="mx-2">Quantity :</strong> <span>1</span>
                  </div>
                  <div className="col-lg-6 mt-1">
                    <i
                      className="fa fa-trash deleteIcon"
                      aria-hidden="true"
                    ></i>
                    <i
                      className="fa fa-pencil editIcon mx-3"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
              {/* Place Order */}
              <div className="placeorder w-100 mt-5">
                <input
                  type="number"
                  step={0.01}
                  defaultValue={0.0}
                  className="form-control mb-4 text-end d-none"
                />

                <div className="row">
                  <div className="col-lg-4 text-start mb-3">
                    <strong>Sub Total : </strong>
                  </div>
                  <div className="col-lg-8 text-start mb-3">
                    <span className="mx-4">$ 24.7</span>
                  </div>
                  <div className="col-lg-4 text-start mb-3">
                    <strong>Tax : </strong>
                  </div>
                  <div className="col-lg-8 text-start mb-3">
                    <span className="mx-4">$ 24.7</span>
                  </div>
                  <div className="col-lg-4 text-start mb-3">
                    <strong>Grand Total : </strong>
                  </div>
                  <div className="col-lg-8 text-start mb-3">
                    <span className="mx-4">$ 24.7</span>
                  </div>
                </div>
                <div className="placeOrderBtn w-100 mt-3">
                  <button
                    className="btn btn-md w-100 btn-pills"
                    onClick={handlePlaceOrder}
                  >
                    Place Order{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}

export default SpecialMenu;
