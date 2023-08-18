import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import SpecialPizzaSelection from "../components/_main/SpecialPizzaSelection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getDips, getSpecialDetails, getToppings } from "../services";
import LoadingLayout from "../layouts/LoadingLayout";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";
import CartList from "../components/_main/Cart/CartList";
import OrderSummary from "../components/_main/Cart/OrderSummary";
import Sides from "../components/SpecialPizza/Sides";
import Dips from "../components/SpecialPizza/Dips";
import Drinks from "../components/SpecialPizza/Drinks";
import { v4 as uuidv4 } from "uuid";
import CartFunction from "../components/cart";

function SpecialMenu() {
  // Global Context
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [cart, setCart] = globalCtx.cart;
  // API States
  const [getSpecialData, setGetSpecialData] = useState();
  const [dipsData, setDipsData] = useState();
  const [toppingsData, setToppingsData] = useState();
  //
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  // UseRef
  const pizzaSizeRef = useRef(null);
  //
  const navigate = useNavigate();
  const location = useLocation();
  const { sid } = useParams();
  // Helper Function
  const cartFn = new CartFunction();
  //
  const [pizzaSize, setPizzaSize] = useState("Large");
  const [pizzaSizePrice, setPizzaSizePrice] = useState();
  const [pizzaState, setPizzaState] = useState([]);
  const [sidesArr, setSidesArr] = useState([]);
  const [dipsArr, setDipsArr] = useState([]);
  const [drinksArr, setDrinksArr] = useState([]);
  const [totalDipsPrice, setTotalDipsPrice] = useState(0);
  const [tempDipsArr, setTempDipsArr] = useState([]);
  // Free Toppings, Sides, Dips, Drinks
  const [freeTpsCount, setFreeTpsCount] = useState();
  const [additionalTps, setAdditionalTps] = useState(0);
  const [freeDipsCount, setFreeDipsCount] = useState();

  const handlePizzaSize = () => {
    if (pizzaSizeRef.current) {
      if (pizzaSizeRef.current.value === "Large") {
        setPizzaSize("Large");
        setPizzaSizePrice(getSpecialData?.largePizzaPrice);
      }
      if (pizzaSizeRef.current.value === "Extra Large") {
        setPizzaSize("Extra Large");
        setPizzaSizePrice(getSpecialData?.extraLargePizzaPrice);
      }
    }
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

  // Handle Crust
  const handleCrust = (e, count) => {
    console.log(e.target.value);
    const selectedCrust = getSpecialData?.crust?.find(
      (data) => data.code === e.target.value
    );
    let crustObject = {
      crustCode: selectedCrust.code,
      crustName: selectedCrust.crustName,
      price: selectedCrust.price,
    };
    let arr = [...pizzaState];
    arr[count - 1] = {
      ...arr[count - 1],
      crust: crustObject,
    };
    setPizzaState(arr);
  };
  // Handle Cheese
  const handleCheese = (e, count) => {
    const selectedCheese = getSpecialData?.cheese?.find(
      (data) => data.code === e.target.value
    );
    let cheeseObject = {
      cheeseCode: selectedCheese.code,
      cheeseName: selectedCheese.cheeseName,
      price: selectedCheese.price,
    };
    let arr = [...pizzaState];
    arr[count - 1] = {
      ...arr[count - 1],
      cheese: cheeseObject,
    };
    setPizzaState(arr);
  };
  // Handle SpecialBases
  const handleSpecialbases = (e, count) => {
    console.log(e.target.value);

    const selectedSpecialbases = getSpecialData?.specialbases?.find(
      (data) => data.code === e.target.value
    );
    let specialbasesObject = {
      specialbasesCode: selectedSpecialbases?.code,
      cheeseName: selectedSpecialbases?.specialbaseName,
      price: selectedSpecialbases?.price,
    };
    let arr = [...pizzaState];
    arr[count - 1] = {
      ...arr[count - 1],
      specialbases: specialbasesObject,
    };
    setPizzaState(arr);
  };

  //Component - Special Pizza Selection
  const spSelection = [];
  for (let i = 1; i <= getSpecialData?.noofPizzas; i++) {
    spSelection.push(
      <SpecialPizzaSelection
        key={i}
        getSpecialData={getSpecialData}
        count={i}
        reset={reset}
        toppingsData={toppingsData}
        pizzaState={pizzaState}
        setPizzaState={setPizzaState}
        handleCrust={handleCrust}
        handleCheese={handleCheese}
        handleSpecialbases={handleSpecialbases}
        setFreeTpsCount={setFreeTpsCount}
        freeTpsCount={freeTpsCount}
        additionalTps={additionalTps}
        setAdditionalTps={setAdditionalTps}
      />
    );
  }
  // Calculate Price
  const calulatePrice = () => {
    let calculatedPrice = Number(0);
    let totalOneTpsPrice = Number(0);
    let totalSidesPrice = Number(0);
    let totalDipsPrice = Number(0);

    // OnChange Pizza Size Price
    calculatedPrice += Number(pizzaSizePrice) || 0;
    pizzaState.forEach((items) => {
      // OnChange Crust Price
      calculatedPrice += items?.crust?.price ? Number(items?.crust?.price) : 0;
      // OnChange Cheese Price
      calculatedPrice += items?.cheese?.price
        ? Number(items?.cheese?.price)
        : 0;
      // OnChange Specialbases Price
      calculatedPrice += items?.specialbases?.price
        ? Number(items?.specialbases?.price)
        : 0;
      // OnChange One Toppings Price
      items.toppings.countAsOneToppings.map((data) => {
        totalOneTpsPrice += Number(data?.toppingsPrice);
      });
    });
    // if (additionalTps > 0 && freeTpsCount === 0) {
    //   let totalFreeAmount = Number(2.0) * Number(getSpecialData.noofToppings);
    //   let calcPrice = Number(totalOneTpsPrice) - Number(totalFreeAmount);
    //   calculatedPrice += Number(calcPrice);
    // }

    // Handle Sides Price
    sidesArr?.map((data) => {
      const filtered = getSpecialData?.freesides?.find(
        (items) => items.code === data?.sideCode
      );
      if (filtered && getSpecialData?.freesides.length !== 0) {
        filtered?.lineEntries?.map((items) => {
          if (items.code === data?.lineCode) {
            totalSidesPrice += Number(0);
          } else {
            totalSidesPrice += Number(data?.sidePrice);
          }
        });
      } else {
        totalSidesPrice += Number(data?.sidePrice);
      }
    });
    calculatedPrice += Number(totalSidesPrice);

    // Handle Dips Price
    let totalQauntity = Number(0);
    let perDipsPrice = Number(0);
    let dipsPrice = Number(0);
    let totalFreeDipsPrice = Number(0);

    if (freeDipsCount > 0) {
      const updatedArr = dipsArr.map((dips) => {
        let updatedQauntity = dips.qauntity - freeDipsCount;
        console.log(updatedQauntity, dips.qauntity, freeDipsCount);

        console.log("Free Count :", freeDipsCount);
        // if (freeDipsCount !== 0) {
        //   setFreeDipsCount(freeDipsCount - 1);
        // }
        return {
          ...dips,
          qauntity: updatedQauntity,
          totalPrice: dips?.price * updatedQauntity,
        };
      });
      setDipsArr(updatedArr);
      if (freeDipsCount !== 0) {
        setFreeDipsCount(freeDipsCount - 1);
      }
    }
    console.log(dipsArr);

    // dipsArr?.map((data) => {
    //   totalQauntity += Number(data.qauntity);
    //   perDipsPrice = Number(data.price);
    // });
    // totalFreeDipsPrice =
    //   Number(perDipsPrice) * Number(getSpecialData?.noofDips);
    // if (totalQauntity > getSpecialData?.noofDips) {
    //   dipsArr?.map((data) => {
    //     dipsPrice += Number(data?.totalPrice);
    //   });
    //   totalDipsPrice = Number(dipsPrice) - Number(totalFreeDipsPrice);
    // }
    // calculatedPrice += Number(totalDipsPrice);

    setTotalPrice(Number(calculatedPrice).toFixed(2));
  };
  // Handle Cart
  const handleAddToCart = () => {
    const payload = {
      productID: uuidv4(),
      productCode: "#NA",
      productName: getSpecialData?.name,
      productType: "special",
      config: {
        pizza: pizzaState,
        sides: sidesArr,
        dips: dipsArr,
        drinks: drinksArr,
      },
      pizzaSize: pizzaSize,
      quantity: "1",
      totalPrice: totalPrice.toFixed(2),
    };
    if (payload) {
      let ct = JSON.parse(localStorage.getItem("cart"));
      ct.product.push(payload);
      const cartProduct = ct.product;
      cartFn.addCart(cartProduct, setCart, false);
      setPizzaSize("Large");
      setPizzaSizePrice(getSpecialData?.largePizzaPrice);
      setSidesArr([]);
      setDipsArr([]);
      setDrinksArr([]);
      createEmptyObjects(Number(getSpecialData?.noofPizzas));
      resetControls();
      setFreeTpsCount(getSpecialData?.noofToppings);
      setAdditionalTps(0);
    }
  };
  // Handle Place Order
  const handlePlaceOrder = () => {
    if (isAuthenticated) {
      toast.success("Order Placed Successfully..");
    } else {
      localStorage.setItem("redirectTo", location?.pathname);
      navigate("/login");
    }
  };
  // Reset Controls
  const resetControls = () => {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  };
  // UseEffect For API
  useEffect(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    setLoading(true);
    getSpecial();
    dips();
    toppings();
  }, []);
  // Calculate Function
  useEffect(() => {
    calulatePrice();
    // console.log("pizzaState :", sidesArr);
  }, [
    sidesArr,
    dipsArr,
    drinksArr,
    totalDipsPrice,
    tempDipsArr,
    pizzaSize,
    pizzaSizePrice,
    pizzaState,
  ]);
  // Create Empty Object of Pizza States
  const createEmptyObjects = (count) => {
    let crustObject = {
      crustCode: getSpecialData?.crust[0].code,
      crustName: getSpecialData?.crust[0].crustName,
      price: getSpecialData?.crust[0].price,
    };
    let cheeseObject = {
      cheeseCode: getSpecialData?.cheese[0].code,
      cheeseName: getSpecialData?.cheese[0].cheeseName,
      price: getSpecialData?.cheese[0].price,
    };
    const emptyObjectsArray = Array.from({ length: count }, () => ({
      crust: crustObject,
      cheese: cheeseObject,
      specialbases: "",
      toppings: {
        countAsTwoToppings: [],
        countAsOneToppings: [],
        freeToppings: [],
      },
    }));
    setPizzaState(emptyObjectsArray);
  };
  // UseEffect For Set Default Values
  useEffect(() => {
    setPizzaSize("Large");
    setPizzaSizePrice(getSpecialData?.largePizzaPrice);
    createEmptyObjects(Number(getSpecialData?.noofPizzas));
    setFreeTpsCount(Number(getSpecialData?.noofToppings));
    setFreeDipsCount(Number(getSpecialData?.noofDips));
    setAdditionalTps(0);
  }, [getSpecialData]);

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
                      onChange={handlePizzaSize}
                      ref={pizzaSizeRef}
                      value={pizzaSize}
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
                      {freeTpsCount} / {getSpecialData?.noofToppings}
                    </span>
                  </p>
                </div>
                <div className="col-lg-12 col-md-6 col-md-6 mb-3">
                  <p>
                    Additional Toppings Used :{" "}
                    <span className="mx-4">{additionalTps}</span>
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
                  <div
                    className="row mb-3"
                    style={{ maxHeight: "450px", overflowY: "scroll" }}
                  >
                    <div id="sides" className="mb-3">
                      {getSpecialData?.sides?.map((data) => {
                        return (
                          <Sides
                            key={data.code}
                            data={data}
                            sidesArr={sidesArr}
                            setSidesArr={setSidesArr}
                            reset={reset}
                          />
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
                          <Dips
                            key={data.dipsCode}
                            data={data}
                            dipsArr={dipsArr}
                            setDipsArr={setDipsArr}
                            reset={reset}
                            totalDipsPrice={totalDipsPrice}
                            noofDips={getSpecialData?.noofDips}
                            tempDipsArr={tempDipsArr}
                            setTempDipsArr={setTempDipsArr}
                            freeDipsCount={freeDipsCount}
                            setFreeDipsCount={setFreeDipsCount}
                          />
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
                          <Drinks
                            key={data.code}
                            data={data}
                            drinksArr={drinksArr}
                            setDrinksArr={setDrinksArr}
                            reset={reset}
                          />
                        );
                      })}
                      {getSpecialData?.bottle.map((data) => {
                        return (
                          <Drinks
                            key={data.code}
                            data={data}
                            drinksArr={drinksArr}
                            setDrinksArr={setDrinksArr}
                            reset={reset}
                          />
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
                  <strong>$ {totalPrice}</strong>
                </p>
                <button
                  type="button"
                  className="position-sticky top-0 addtocartbtn w-50 btn btn-sm px-3 py-2 text-white"
                  onClick={handleAddToCart}
                >
                  <b>Add to Cart</b>
                </button>
              </div>

              {/* Cart List */}
              <div className="cartlist w-100 mt-5">
                <h2 className="p-3 text-center orderTitle">Your Orders</h2>
                {cart?.product.map((cData) => {
                  return <CartList cData={cData} key={cData.productID} />;
                })}
              </div>
              {/* Place Order */}
              <div className="placeorder w-100 mt-5">
                <OrderSummary cart={cart} />
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
