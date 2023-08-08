import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import "../assets/styles/custom.css";
import { getAllIngredients, getSides } from "../services";
import LoadingLayout from "../layouts/LoadingLayout";
import "../assets/styles/CreateYourOwn/style.css";
import GlobalContext from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CartList from "../components/_main/Cart/CartList";
import OrderSummary from "../components/_main/Cart/OrderSummary";
import {
  SelectedCheeseDropDown,
  SelectedCrustDropDown,
  SelectedSpecialbasesDropDown,
} from "../components/CreateYourOwn/SelectedDropDown";
import CountAsTwo from "../components/CreateYourOwn/Toppings/CountAsTwo";
import CountAsOne from "../components/CreateYourOwn/Toppings/CountAsOne";
import FreeToppings from "../components/CreateYourOwn/Toppings/FreeToppings";
import Drinks from "../components/CreateYourOwn/Drinks";
import Dips from "../components/CreateYourOwn/Dips";

function CreateYourOwn() {
  // Global Context
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [cart, setCart] = globalCtx.cart;
  // API States
  const [allIngredients, setAllIngredients] = useState();
  const [sideData, setSideData] = useState();
  //
  const navigate = useNavigate();
  const location = useLocation();
  //
  const [loading, setLoading] = useState(false);
  const [userLongitude, setUserLongitude] = useState("40.42");
  const [userLatitude, setUserLatitude] = useState("20.22");

  // All State
  const [totalPrice, setTotalPrice] = useState();
  const [crust, setCrust] = useState();
  const [cheese, setCheese] = useState();
  const [specialbases, setSpecialbases] = useState();
  const [countTwoToppingsArr, setCountTwoToppingsArr] = useState([]);
  const [countOneToppingsArr, setCountOneToppingsArr] = useState([]);
  const [freeToppingsArr, setFreeToppingsArr] = useState([]);
  const [drinksArr, setDrinksArr] = useState([]);
  const [dipsArr, setDipsArr] = useState([]);
  const [reset, setReset] = useState(false);

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (isAuthenticated) {
      toast.success("Order Placed Successfully..");
    } else {
      localStorage.setItem("redirectTo", location?.pathname);
      navigate("/login");
    }
  };

  // Calculate Price
  const calulatePrice = () => {
    let calculatedPrice = Number(0);
    let totalTwoToppings = Number(0);
    let totalOneToppings = Number(0);
    let totalFreeToppings = Number(0);
    let totalDrinks = Number(0);
    let totalDips = Number(0);

    if (countTwoToppingsArr) {
      countTwoToppingsArr.map(
        (twoTps) => (totalTwoToppings += Number(twoTps.toppingsPrice))
      );
    }
    if (countOneToppingsArr) {
      countOneToppingsArr.map(
        (oneTps) => (totalOneToppings += Number(oneTps.toppingsPrice))
      );
    }
    if (freeToppingsArr) {
      freeToppingsArr.map(
        (freeTps) => (totalFreeToppings += Number(freeTps.toppingsPrice))
      );
    }
    if (drinksArr) {
      drinksArr.map((drinks) => (totalDrinks += Number(drinks.totalPrice)));
    }
    if (dipsArr) {
      dipsArr.map((dips) => (totalDips += Number(dips.totalPrice)));
    }
    calculatedPrice += Number(crust?.price) || 0;
    calculatedPrice += Number(cheese?.price) || 0;
    calculatedPrice += Number(specialbases?.price) || 0;
    calculatedPrice += Number(totalTwoToppings) || 0;
    calculatedPrice += Number(totalOneToppings) || 0;
    calculatedPrice += Number(totalFreeToppings) || 0;
    calculatedPrice += Number(totalDrinks) || 0;
    calculatedPrice += Number(totalDips) || 0;

    setTotalPrice(calculatedPrice);
  };

  // Handle Add To Cart
  const handleAddToCart = () => {
    const payload = {
      productCode: "",
      productName: "Customized Pizza",
      productType: "custom_pizza",
      config: {
        pizza: [
          {
            crust: crust,
            cheese: cheese,
            specialbases: specialbases,
            toppings: {
              countAsTwo: countTwoToppingsArr,
              countAsOne: countOneToppingsArr,
              freeToppings: freeToppingsArr,
            },
          },
        ],
        dips: dipsArr,
        drinks: drinksArr,
      },
      quantity: "1",
      totalPrice: "",
    };
    console.log(payload);
    setCrust({
      crustCode: allIngredients?.crust[0].crustCode,
      crustName: allIngredients?.crust[0].crustName,
      price: allIngredients?.crust[0].price,
    });
    setCheese({
      cheeseCode: allIngredients?.cheese[0].cheeseCode,
      cheeseName: allIngredients?.cheese[0].cheeseName,
      price: allIngredients?.cheese[0].price,
    });
    setSpecialbases({});
    setCountTwoToppingsArr([]);
    setCountOneToppingsArr([]);
    setFreeToppingsArr([]);
    setDrinksArr([]);
    setDipsArr([]);
    resetControls();
    console.log(crust);
  };

  //API - All Ingredient
  const allIngredinant = async () => {
    setLoading(true);
    await getAllIngredients()
      .then((res) => {
        setAllIngredients(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error From All Ingredients : ", err);
      });
  };

  //API - Sides
  const sides = async () => {
    setLoading(true);
    await getSides()
      .then((res) => {
        setSideData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error From Sides ", err);
      });
  };

  // Reset Controls
  const resetControls = () => {
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  };

  useEffect(() => {
    setCrust({
      crustCode: allIngredients?.crust[0].crustCode,
      crustName: allIngredients?.crust[0].crustName,
      price: allIngredients?.crust[0].price,
    });
    setCheese({
      cheeseCode: allIngredients?.cheese[0].cheeseCode,
      cheeseName: allIngredients?.cheese[0].cheeseName,
      price: allIngredients?.cheese[0].price,
    });
  }, [allIngredients]);

  useEffect(() => {
    // Screen Always Set To Top after UseEffect Called
    setLoading(false);
    window.scrollTo(0, 0);
    setLoading(true);
    // API
    allIngredinant();
    sides();
  }, []);

  // Calculate Function
  useEffect(() => {
    calulatePrice();
  }, [
    crust,
    cheese,
    specialbases,
    countTwoToppingsArr,
    countOneToppingsArr,
    freeToppingsArr,
    drinksArr,
    dipsArr,
  ]);

  return (
    <div>
      <Header />
      {loading ? (
        <>
          <LoadingLayout />
        </>
      ) : (
        <section className="container-fluid new-block m-0 p-0 w-100">
          {/* Heading */}
          <div className="position-sticky top-0 custmized-main">
            <div className="d-flex flex-wrap justify-content-center bg-dark align-items-center p-3 custmized">
              <h2 className="m-3 text-white">
                <strong>Create Your Own - Pizza</strong>
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
                    <select className="form-select form-drop mx-4">
                      <option>Large</option>
                      <option>Extra Large</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Crust, Cheese, Specialbases */}
              <div className="row mb-3 border-bottom">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-3">
                  <div className="d-flex justify-content-start align-items-center w-100">
                    <p className="mb-1 ">Crust :</p>
                    <SelectedCrustDropDown
                      allIngredients={allIngredients}
                      setCrust={setCrust}
                      crust={crust}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="d-flex justify-content-start align-items-center w-100">
                    <p className="mb-1 ">Cheese :</p>
                    <SelectedCheeseDropDown
                      allIngredients={allIngredients}
                      setCheese={setCheese}
                      cheese={cheese}
                    />
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="d-flex justify-content-start align-items-center w-100">
                    <p className="mb-1">Specialbases :</p>
                    <SelectedSpecialbasesDropDown
                      allIngredients={allIngredients}
                      setSpecialbases={setSpecialbases}
                      specialbases={specialbases}
                      reset={reset}
                    />
                  </div>
                </div>
              </div>

              {/* toppings */}
              <div className="p-2 pizza-heading text-center">
                <h4 className="my-1">Toppings</h4>
              </div>
              <div className="row gx-4 mb-3 mt-4">
                {/* count 2 toppings */}
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                  <p className="text-center tps-title pb-3 border-bottom border-3">
                    Toppings (Count 2)
                  </p>
                  {allIngredients?.toppings?.countAsTwo?.map((data) => {
                    return (
                      <CountAsTwo
                        key={data.toppingsCode}
                        data={data}
                        setCountTwoToppingsArr={setCountTwoToppingsArr}
                        countTwoToppingsArr={countTwoToppingsArr}
                        reset={reset}
                      />
                    );
                  })}
                </div>
                {/* count 1 toppings */}
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                  <p className="text-center tps-title pb-3 border-bottom border-3">
                    Toppings (Count 1)
                  </p>
                  {allIngredients?.toppings?.countAsOne?.map((data) => {
                    return (
                      <CountAsOne
                        key={data.toppingsCode}
                        data={data}
                        countOneToppingsArr={countOneToppingsArr}
                        setCountOneToppingsArr={setCountOneToppingsArr}
                        reset={reset}
                      />
                    );
                  })}
                </div>
                {/* indians toppings (free) */}
                <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
                  <p className="text-center tps-title pb-3 border-bottom border-3">
                    Indians Toppings (Free)
                  </p>
                  {allIngredients?.toppings?.freeToppings?.map((data) => {
                    return (
                      <FreeToppings
                        key={data.toppingsCode}
                        data={data}
                        setFreeToppingsArr={setFreeToppingsArr}
                        freeToppingsArr={freeToppingsArr}
                        reset={reset}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sides */}
              <div className="p-2 pizza-heading text-center">
                <h4 className="my-1">Sides</h4>
              </div>
              <div className="row mb-3">
                <div id="sides" className="mb-3">
                  {sideData?.map((data) => {
                    return (
                      <div
                        className="p-2 d-flex justify-content-between align-items-center border-bottom"
                        key={data.sideCode}
                      >
                        <span className="mx-2">{data.sideName}</span>
                        <div className="w-50 d-flex justify-content-end">
                          <select className="form-select w-50 mx-4 d-inline-block">
                            {data?.combination?.map((combination) => {
                              return (
                                <option
                                  key={combination.lineCode}
                                  value={combination.lineCode}
                                >
                                  {combination.size} - ${combination.price}
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

              {/* Dips */}
              <div className="p-2 pizza-heading text-center">
                <h4 className="my-1">Dips</h4>
              </div>
              <div className="row mb-3">
                <div id="dips" className="mb-3">
                  {allIngredients?.dips?.map((data) => {
                    return (
                      <Dips
                        key={data.dipsCode}
                        data={data}
                        setDipsArr={setDipsArr}
                        dipsArr={dipsArr}
                        reset={reset}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Drinks */}
              <div className="p-2 pizza-heading text-center">
                <h4 className="my-1">Drinks</h4>
              </div>
              <div className="row mb-3">
                <div id="drinks" className="mb-3">
                  {allIngredients?.softdrinks?.map((data) => {
                    return (
                      <Drinks
                        key={data.softdrinkCode}
                        data={data}
                        setDrinksArr={setDrinksArr}
                        drinksArr={drinksArr}
                        reset={reset}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total Price and Add To Cart - Button */}
            <div className="w-25 m-3 p-3">
              <div className="d-flex w-100 align-items-center justify-content-center flex-column position-relative">
                <p className="text-drak mb-3 mx-1">
                  <strong>
                    $
                    {totalPrice
                      ? Number(totalPrice).toFixed(2)
                      : (0.0).toFixed(2)}
                  </strong>
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
                  return <CartList cData={cData} key={cData.productCode} />;
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

export default CreateYourOwn;
