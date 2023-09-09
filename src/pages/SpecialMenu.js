import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../components/_main/Header";
import Footer from "../components/_main/Footer";
import SpecialPizzaSelection from "../components/_main/SpecialPizzaSelection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deliverable,
  getDips,
  getSpecialDetails,
  getToppings,
  orderPlace,
} from "../services";
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
import swal from "sweetalert";
import { useSelector } from "react-redux";
import ResponsiveCart from "../components/_main/Cart/ResponsiveCart";

function SpecialMenu() {
  // Global Context
  const globalCtx = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = globalCtx.auth;
  const [payloadEdit, setPayloadEdit] = globalCtx.productEdit;
  const [cart, setCart] = globalCtx.cart;
  const [settings, setSettings] = globalCtx.settings;
  const [regUser, setRegUser] = globalCtx.regUser;
  // redux
  const { user } = useSelector((state) => state);
  // API Response - States
  const [getSpecialData, setGetSpecialData] = useState();
  const [dipsData, setDipsData] = useState();
  const [toppingsData, setToppingsData] = useState();
  // Helper Function
  const cartFn = new CartFunction();
  // UseRef
  const pizzaSizeRef = useRef(null);
  //
  const navigate = useNavigate();
  const location = useLocation();
  const { sid } = useParams();
  // All States
  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [pizzaSize, setPizzaSize] = useState("Large");
  const [pizzaSizePrice, setPizzaSizePrice] = useState();
  const [pizzaState, setPizzaState] = useState([]);
  const [sidesArr, setSidesArr] = useState({});
  const [dipsObj, setDipsObj] = useState({});
  const [drinksObj, setDrinksObj] = useState({});
  const [totalPrice, setTotalPrice] = useState();
  let calcDipsArr = [];
  let calcOneTpsArr = [];
  let calcTwoTpsArr = [];
  let noOfFreeToppings = Number(getSpecialData?.noofToppings);
  let noOfAdditionalTps = Number(0);
  // Free Toppings, Sides, Dips, Drinks
  const [freeTpsCount, setFreeTpsCount] = useState();
  const [additionalTps, setAdditionalTps] = useState(0);

  // console.log("API Data", getSpecialData);

  // Handle Pizza Size and Price
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
      specialbaseName: selectedSpecialbases?.specialbaseName,
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
        payloadEdit={payloadEdit}
      />
    );
  }
  // Calculate Price
  const calulatePrice = () => {
    let calculatedPrice = Number(0);
    let totalOneTpsPrice = Number(0);
    let totalTwoTpsPrice = Number(0);
    let totalSidesPrice = Number(0);
    let totalDipsPrice = Number(0);

    // OnChange Pizza Size - Price
    calculatedPrice += Number(pizzaSizePrice) || 0;

    // Crust, Cheese & Specialbases - Price
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
    });

    // Handle CountAsOne & CountAsTwo Toppings - Price
    pizzaState?.map((data) => {
      let amount = 0;
      if (data?.toppings?.countAsTwo.length > 0) {
        data?.toppings?.countAsTwo?.map((items) => {
          if (noOfFreeToppings > 1) {
            let tpsObj = {
              ...items,
              amount: 0,
            };
            calcTwoTpsArr.push(tpsObj);
            noOfFreeToppings -= Number(2);
          } else if (noOfFreeToppings === 1) {
            let tpsObj = {
              ...items,
              amount: Number(items?.toppingsPrice) / 2,
            };
            calcTwoTpsArr.push(tpsObj);
            noOfFreeToppings -= Number(1);
            noOfAdditionalTps++;
          } else {
            calcTwoTpsArr.push(items);
            noOfAdditionalTps += Number(2);
          }
        });
      }
      if (data?.toppings?.countAsOne.length > 0) {
        data?.toppings?.countAsOne?.map((items) => {
          if (noOfFreeToppings > 0) {
            let tpsObj = {
              ...items,
              amount: amount,
            };
            calcOneTpsArr.push(tpsObj);
            noOfFreeToppings--;
          } else {
            calcOneTpsArr.push(items);
            noOfAdditionalTps++;
          }
        });
      }
    });
    calcOneTpsArr?.map((tps) => {
      totalOneTpsPrice += Number(tps?.amount);
    });
    calculatedPrice += totalOneTpsPrice;
    calcTwoTpsArr?.map((tps) => {
      totalTwoTpsPrice += Number(tps?.amount);
    });
    calculatedPrice += totalTwoTpsPrice;

    // // Handle Sides Price
    // sidesArr?.map((data) => {
    //   const filtered = getSpecialData?.freesides?.find(
    //     (items) => items.code === data?.sideCode
    //   );
    //   if (filtered && getSpecialData?.freesides.length !== 0) {
    //     filtered?.lineEntries?.map((items) => {
    //       if (items.code === data?.lineCode) {
    //         totalSidesPrice += Number(0);
    //       } else {
    //         totalSidesPrice += Number(data?.sidePrice);
    //       }
    //     });
    //   } else {
    //     totalSidesPrice += Number(data?.sidePrice);
    //   }
    // });
    // calculatedPrice += Number(totalSidesPrice);

    // Set Total Price
    setTotalPrice(Number(calculatedPrice).toFixed(2));
  };
  // Handle Cart
  const handleAddToCart = () => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      // Updated Arr of CountAsOne After Calculation
      if (calcOneTpsArr?.length > 0) {
        let arr = [...pizzaState];
        calcOneTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsOne = [];
        });
        calcOneTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsOne = [
            ...arr[tpsObj?.pizzaIndex].toppings.countAsOne,
            tpsObj,
          ];
        });
      }
      // Updated Arr of CountAsTwo After Calculation
      if (calcTwoTpsArr?.length > 0) {
        let arr = [...pizzaState];
        calcTwoTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsTwo = [];
        });
        calcTwoTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsTwo = [
            ...arr[tpsObj?.pizzaIndex].toppings.countAsTwo,
            tpsObj,
          ];
        });
      }
      const editedPayload = {
        id: payloadEdit?.id,
        productCode: payloadEdit?.productCode,
        productName: getSpecialData?.name,
        productType: "special",
        config: {
          pizza: pizzaState,
          sides: sidesArr,
          dips: dipsObj,
          drinks: drinksObj,
        },
        quantity: Number(1),
        price: Number(totalPrice).toFixed(2),
        amount: Number(totalPrice).toFixed(2) * Number(1),
        pizzaSize: pizzaSize,
        comments: "",
      };
      console.log(editedPayload);
      if (editedPayload) {
        let ct = JSON.parse(localStorage.getItem("cart"));
        const filteredCart = ct?.product?.filter(
          (items) => items?.id !== editedPayload?.id
        );
        filteredCart.push(editedPayload);
        const cartProduct = filteredCart;
        cartFn.addCart(cartProduct, setCart, true, settings);
        // Reset All Fields
        resetControls();
        setPayloadEdit();
      }
    } else {
      // Updated Arr of CountAsOne After Calculation
      if (calcOneTpsArr?.length > 0) {
        let arr = [...pizzaState];
        calcOneTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsOne = [];
        });
        calcOneTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsOne = [
            ...arr[tpsObj?.pizzaIndex].toppings.countAsOne,
            tpsObj,
          ];
        });
      }
      // Updated Arr of CountAsTwo After Calculation
      if (calcTwoTpsArr?.length > 0) {
        let arr = [...pizzaState];
        calcTwoTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsTwo = [];
        });
        calcTwoTpsArr?.map((tpsObj) => {
          arr[tpsObj?.pizzaIndex].toppings.countAsTwo = [
            ...arr[tpsObj?.pizzaIndex].toppings.countAsTwo,
            tpsObj,
          ];
        });
      }
      const payload = {
        id: uuidv4(),
        productCode: getSpecialData?.code,
        productName: getSpecialData?.name,
        productType: "special",
        config: {
          pizza: pizzaState,
          sides: sidesArr,
          dips: dipsObj,
          drinks: drinksObj,
        },
        quantity: Number(1),
        price: Number(totalPrice).toFixed(2),
        amount: Number(totalPrice).toFixed(2) * Number(1),
        pizzaSize: pizzaSize,
        comments: "",
      };
      console.log(payload);
      if (payload) {
        let ct = JSON.parse(localStorage.getItem("cart"));
        ct.product.push(payload);
        const cartProduct = ct.product;
        cartFn.addCart(cartProduct, setCart, false, settings);
        resetControls();
      }
    }
  };
  const paymentGateway = () => {
    let custFullName = regUser.firstName + " " + regUser?.lastName;
    console.log(process.env.REACT_APP_CALLBACKURL);
    const payload = {
      callbackUrl: process.env.REACT_APP_CALLBACKURL,
      cancelUrl: process.env.REACT_APP_CANCEL,
      customerCode: user?.data?.customerCode,
      customerName: custFullName,
      mobileNumber: regUser?.mobileNumber,
      address: regUser?.address,
      zipCode: regUser?.zipcode,
      products: cart?.product,
      subTotal: cart?.subtotal,
      discountAmount: cart?.discountAmount,
      taxPer: cart?.taxPer,
      taxAmount: cart?.taxAmount,
      deliveryCharges: cart?.deliveryCharges,
      extraDeliveryCharges: cart?.extraDeliveryCharges,
      grandTotal: cart?.grandtotal,
    };
    orderPlace(payload)
      .then((response) => {
        localStorage.setItem("placedOrder", JSON.stringify(response));
        navigate("/order/verify");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };
  // Handle Place Order
  const handlePlaceOrder = async () => {
    if (cart?.product?.length > 0) {
      if (isAuthenticated && user !== null) {
        const previousUrl = localStorage.getItem("prevUrl");
        if (previousUrl && previousUrl !== null) {
          console.log(regUser.zipcode);
          const payload = { zipcode: regUser.zipcode };
          setLoading(true);
          await deliverable(payload)
            .then((res) => {
              if (res?.deliverable === true) {
                paymentGateway();
              } else {
                swal({
                  title: "Postal Code is Undeliverable",
                  text: `postal code cannot deliverable. Please change the postal code and try again`,
                  icon: "warning",
                  buttons: {
                    ok: "Ok",
                  },
                  dangerMode: true,
                }).then(async (willOk) => {
                  if (willOk) {
                  }
                });
              }
            })
            .catch((error) => {
              if (
                error.response.status === 400 ||
                error.response.status === 500
              ) {
                toast.error(error.response.data.message);
              }
            });
        } else {
          navigate("/address-details");
        }
      } else {
        localStorage.setItem("redirectTo", location?.pathname);
        navigate("/registration");
      }
    } else {
      toast.error("Cart is Empty...");
    }
  };
  // Reset Controls
  const resetControls = () => {
    setPizzaSize("Large");
    setPizzaSizePrice(getSpecialData?.largePizzaPrice);
    setTotalPrice(getSpecialData?.largePizzaPrice);
    setFreeTpsCount(Number(getSpecialData?.noofToppings));
    createEmptyObjects(Number(getSpecialData?.noofPizzas));
    setDrinksObj({
      drinksCode: getSpecialData?.pops[0]?.code,
      drinksName: getSpecialData?.pops[0]?.softDrinkName,
      price: getSpecialData?.pops[0]?.price,
      amount: Number(0).toFixed(2),
    });
    if (getSpecialData?.freesides && getSpecialData?.freesides.length > 0) {
      const combinationData = getSpecialData?.freesides?.[0]?.lineEntries?.[0];
      const sidesObject = {
        sideCode: getSpecialData?.freesides?.[0]?.code,
        sideName: getSpecialData?.freesides?.[0]?.sideName,
        lineCode: combinationData?.code,
        sidePrice: combinationData?.price,
        sideSize: combinationData?.size,
      };
      setSidesArr(sidesObject);
    } else {
      setSidesArr({});
    }
    if (Number(getSpecialData?.noofDips) > 0) {
      setDipsObj({
        dipsCode: dipsData?.[0]?.dipsCode,
        dipsName: dipsData?.[0]?.dipsName,
        price: dipsData?.[0]?.price,
        quantity: Number(getSpecialData?.noofDips),
        amount: Number(0).toFixed(2),
      });
    } else {
      setDipsObj({});
    }
    calcDipsArr = [];
    setAdditionalTps(0);
    setReset(true);
    setTimeout(() => {
      setReset(false);
    }, 1000);
  };
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
        countAsTwo: [],
        countAsOne: [],
        freeToppings: [],
      },
    }));
    setPizzaState(emptyObjectsArray);
  };

  // ----- API Endpoints -----
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

  // ----- UseEffect -----
  // UseEffect For API
  useEffect(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    setLoading(true);
    getSpecial();
    dips();
    toppings();
  }, []);
  // UseEffect For CreateCart When Cart is Null
  useEffect(() => {
    cartFn.createCart(setCart);
  }, [setCart]);
  // Calculate Function
  useEffect(() => {
    calulatePrice();
    setFreeTpsCount(noOfFreeToppings);
    setAdditionalTps(noOfAdditionalTps);
    console.log("SidesObject :", sidesArr);
  }, [
    sidesArr,
    dipsObj,
    drinksObj,
    pizzaSize,
    pizzaSizePrice,
    pizzaState,
    calcDipsArr,
    calcOneTpsArr,
    calcTwoTpsArr,
    noOfFreeToppings,
  ]);
  // UseEffect For Set Default Values
  useEffect(() => {
    if (!payloadEdit) {
      createEmptyObjects(Number(getSpecialData?.noofPizzas));
      if (getSpecialData?.noofToppings !== undefined) {
        setFreeTpsCount(Number(getSpecialData?.noofToppings));
        setAdditionalTps(0);
      }
      if (Number(getSpecialData?.largePizzaPrice) !== 0) {
        setPizzaSize("Large");
        setPizzaSizePrice(Number(getSpecialData?.largePizzaPrice));
        setTotalPrice(getSpecialData?.largePizzaPrice);
      } else {
        setPizzaSize("Extra Large");
        setPizzaSizePrice(Number(getSpecialData?.extraLargePizzaPrice));
        setTotalPrice(getSpecialData?.extraLargePizzaPrice);
      }

      if (getSpecialData?.freesides && getSpecialData?.freesides.length > 0) {
        const combinationData =
          getSpecialData?.freesides?.[0]?.lineEntries?.[0];
        const sidesObject = {
          sideCode: getSpecialData?.freesides?.[0]?.code,
          sideName: getSpecialData?.freesides?.[0]?.sideName,
          lineCode: combinationData?.code,
          sidePrice: combinationData?.price,
          sideSize: combinationData?.size,
        };
        setSidesArr(sidesObject);
      } else {
        setSidesArr({});
      }
      if (Number(getSpecialData?.noofDips) > 0) {
        setDipsObj({
          dipsCode: dipsData?.[0]?.dipsCode,
          dipsName: dipsData?.[0]?.dipsName,
          price: dipsData?.[0]?.price,
          quantity: Number(getSpecialData?.noofDips),
          amount: Number(0).toFixed(2),
        });
      } else {
        setDipsObj({});
      }
    }
  }, [getSpecialData]);
  // Populate All Fields - Edit Pizza
  useEffect(() => {
    if (
      payloadEdit &&
      payloadEdit !== undefined &&
      payloadEdit.productType === "special"
    ) {
      setPizzaSize(payloadEdit?.pizzaSize);
      if (payloadEdit?.pizzaSize === "Large") {
        setPizzaSizePrice(getSpecialData?.largePizzaPrice);
      }
      if (payloadEdit?.pizzaSize === "Extra Large") {
        setPizzaSizePrice(getSpecialData?.largePizzaPrice);
      }
      setPizzaState(payloadEdit?.config?.pizza);
      setSidesArr(payloadEdit?.config?.sides);
      setDipsObj(payloadEdit?.config?.dips);
      setDrinksObj(payloadEdit?.config?.drinks);
    }
  }, [payloadEdit]);

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
                <strong>
                  {payloadEdit &&
                  payloadEdit !== undefined &&
                  payloadEdit.productType === "special"
                    ? `${getSpecialData?.name} [ Edit ]`
                    : getSpecialData?.name}
                </strong>
              </h2>
            </div>
          </div>
          <div className="row m-0 p-0 w-100 justify-content-center">
            {/* Pizza Selection */}
            <div className="col-lg-9 col-md-12 col-sm-12 pizzaSelection py-lg-4 px-lg-3 px-3 py-4">
              {/* Pizza Size, noofToppings, additional-Toppings */}
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
                      {Number(getSpecialData?.largePizzaPrice) !== 0 ? (
                        <option value="Large">Large</option>
                      ) : (
                        ""
                      )}
                      {Number(getSpecialData?.extraLargePizzaPrice) !== 0 ? (
                        <option value="Extra Large">Extra Large</option>
                      ) : (
                        ""
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-md-12 mb-3">
                  <p>
                    Free Toppings :{" "}
                    <span className="mx-4">
                      {freeTpsCount} / {getSpecialData?.noofToppings}
                    </span>
                  </p>
                </div>
                <div className="col-lg-12 col-md-12 col-md-12 mb-3">
                  <p>
                    Additional Toppings Used :{" "}
                    <span className="mx-4">{additionalTps}</span>
                  </p>
                </div>
              </div>

              {/* Pizza Selection */}
              {spSelection}

              {/* Sides */}
              {getSpecialData?.freesides &&
              getSpecialData?.freesides.length <= 0 ? (
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
                    <div id="sides" className="col-lg-12 mb-3 sidesContent">
                      {getSpecialData?.freesides?.map((data) => {
                        return (
                          <Sides
                            key={data.code}
                            data={data}
                            sidesArr={sidesArr}
                            setSidesArr={setSidesArr}
                            reset={reset}
                            payloadEdit={payloadEdit}
                          />
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* Dips & Drinks */}
              <div className="row gx-3">
                {/* Dips */}
                {Number(getSpecialData?.noofDips) === 0 ? (
                  ""
                ) : (
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="p-2 pizza-heading text-center">
                      <h4 className="my-1">Dips</h4>
                    </div>
                    <div className="row gx-3 mb-3">
                      <div id="dips" className="col-lg-12 mb-3 dipsContent">
                        {dipsData?.length > 0 && (
                          <Dips
                            dipsData={dipsData}
                            dipsObj={dipsObj}
                            setDipsObj={setDipsObj}
                            noofDips={getSpecialData?.noofDips}
                            reset={reset}
                            payloadEdit={payloadEdit}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Drinks */}
                {getSpecialData?.pops && getSpecialData?.bottle && (
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    {(getSpecialData?.pops.length > 0 ||
                      getSpecialData?.bottle.length > 0) && (
                      <div className="p-2 pizza-heading text-center">
                        <h4 className="my-1">Drinks</h4>
                      </div>
                    )}
                    <div className="row gx-3 mb-3">
                      <div
                        id="sides"
                        className="mb-3 d-flex justify-content-center align-items-center"
                      >
                        {getSpecialData?.pops.length > 0 &&
                          getSpecialData?.bottle.length > 0 && (
                            <Drinks
                              reset={reset}
                              payloadEdit={payloadEdit}
                              getSpecialData={getSpecialData}
                              drinksObj={drinksObj}
                              setDrinksObj={setDrinksObj}
                            />
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Total Price and Add To Cart - Button */}
            <div className="col-lg-3 py-lg-4 px-lg-3 d-lg-block d-none">
              <div className="d-flex w-100 align-items-center justify-content-center flex-column position-relative">
                <p className="text-dark mb-3">
                  <strong>
                    ${" "}
                    {totalPrice
                      ? Number(totalPrice).toFixed(2)
                      : (0.0).toFixed(2)}
                  </strong>
                </p>
                <button
                  type="button"
                  className="addtocartbtn w-50 btn btn-sm px-3 py-2 text-white"
                  onClick={handleAddToCart}
                >
                  <b>
                    {payloadEdit &&
                    payloadEdit !== undefined &&
                    payloadEdit?.productType === "special"
                      ? "Update Pizza"
                      : "Add To Cart"}
                  </b>
                </button>
              </div>

              {/* Cart List */}
              <div className="cartlist w-100 mt-5">
                <h2 className="p-3 text-center orderTitle">Your Orders</h2>
                {cart?.product.map((cData) => {
                  return (
                    <CartList
                      cData={cData}
                      key={cData.id}
                      setPayloadEdit={setPayloadEdit}
                      payloadEdit={payloadEdit}
                      resetControls={resetControls}
                      setLoading={setLoading}
                    />
                  );
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
          {cart?.product?.length > 0 && (
            <ResponsiveCart
              handleAddToCart={handleAddToCart}
              totalPrice={totalPrice}
              payloadEdit={payloadEdit}
            />
          )}
        </section>
      )}
      <Footer />
    </div>
  );
}

export default SpecialMenu;
