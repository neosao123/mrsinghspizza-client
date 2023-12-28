import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GlobalContext from "../context/GlobalContext";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { getStoreLocation, orderPlace } from "../services";

// Developer: Shreyas Mahamuni, Working Date: 23-12-2023

function PickupOrder() {
  const [loading, setLoading] = useState(false);
  const [storeDetails, setStoreDetails] = useState();
  const [isShowConfirmPickup, setIsShowConfirmPickup] = useState(false);
  const [selectedStore, setSelectedStore] = useState({});

  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;

  // API - Get Store Location
  const getStoreDetails = async () => {
    setLoading(true);
    await getStoreLocation()
      .then((res) => {
        setLoading(false);
        setStoreDetails(res.data);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleChooseStore = (data) => {
    setLoading(true);
    setSelectedStore(data);
    setIsShowConfirmPickup(true);
    setLoading(false);
  };

  const handleBackToStore = () => {
    setLoading(true);
    setIsShowConfirmPickup(false);
    setSelectedStore({});
    setLoading(false);
  };

  const handlePickupOrder = () => {
    const payload = {
      customerCode: user?.data?.customerCode,
      deliveryType: "pickup",
      customerName: user?.data?.fullName,
      mobileNumber: user?.data?.mobileNumber,
      products: cart?.product,
      subTotal: cart?.subtotal,
      discountAmount: cart?.discountAmount,
      taxPer: cart?.taxPer,
      taxAmount: cart?.taxAmount,
      deliveryCharges: Number(0).toFixed(2),
      extraDeliveryCharges: Number(0).toFixed(2),
      grandTotal: cart?.grandtotal,
      storeCode: selectedStore?.code,
    };
    orderPlace(payload)
      .then((response) => {
        localStorage.setItem("placedOrder", JSON.stringify(response));
        navigate("/order/verify");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          if (error.response.data.isStoreError === true) {
            swal({
              title: "Store has been closed.",
              text: `Unfortunately, placing an order is not possible at the moment. You can not place order right now.`,
              icon: "warning",
              buttons: "Ok",
              dangerMode: true,
            }).then(async (willOk) => {
              if (willOk) {
                navigate("/address-details");
              }
            });
          } else {
            toast.error(error.response.data.message);
          }
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    getStoreDetails();
  }, []);
  return (
    <>
      {isShowConfirmPickup === false ? (
        <>
          <div className="row checkout_pg mb-3">
            <h1 className="titleColor mb-3">Pick up</h1>
            <p className="subTitleColor mb-4">Store Location : </p>
          </div>
          <div className="row gx-4 mb-3 justify-content-between">
            <div className="col-xl-6 col-lg-7 col-md-7 p-0 m-0 px-2 row">
              {storeDetails?.map((data) => {
                return (
                  <div className="col-12 p-0 pb-2" key={data.code}>
                    <div className="card mb-3 store_content shadow-sm">
                      <div
                        className="card-header py-3 text-start store_header"
                        style={{ border: "none" }}
                      >
                        {data.storeLocation}
                      </div>
                      <div className="card-body text-start">
                        {data.storeAddress}
                      </div>
                      <div
                        className="card-footer text-start bg-white"
                        style={{ border: "none" }}
                      >
                        <button
                          className="btn btn-sm chooseStoreBtn btn-success px-3 mb-2"
                          onClick={() => {
                            handleChooseStore(data);
                          }}
                        >
                          Choose this store
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-xl-6 col-lg-5 col-md-5 col-sm-12 px-2 p-0 m-0">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                  <div className="block-stl10 odr-summary mb-0">
                    <h3>Order Summary :</h3>
                    <ul className="list-unstyled">
                      <li>
                        <span className="ttl">Sub Total</span>{" "}
                        <span className="stts">
                          $ {cart?.subtotal ? cart?.subtotal : (0.0).toFixed(2)}
                        </span>
                      </li>
                      <li>
                        <span className="ttl">
                          Tax Amount ( {cart?.taxPer ? cart?.taxPer : 0} % )
                        </span>{" "}
                        <span className="stts">
                          ${" "}
                          {cart?.taxAmount
                            ? cart?.taxAmount
                            : Number(0).toFixed(2)}
                        </span>
                      </li>
                      <li className="d-none">
                        <span className="ttl">Convenience Charges (%)</span>{" "}
                        <span className="stts">
                          ${" "}
                          {cart?.convinenceCharges
                            ? cart?.convinenceCharges
                            : 0}
                        </span>
                      </li>
                      <li className="d-none">
                        <span className="ttl">Delivery Charges</span>{" "}
                        <span className="stts">
                          ${" "}
                          {cart?.deliveryCharges
                            ? cart?.deliveryCharges
                            : Number(0).toFixed(2)}
                        </span>
                      </li>
                    </ul>
                    <div className="ttl-all">
                      <span className="ttlnm">Grand Total</span>
                      <span className="odr-stts">
                        ${" "}
                        {cart?.grandtotal ? cart?.grandtotal : (0.0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="row checkout_pg">
            <h1 className="titleColor mb-3">Pick up</h1>
            <p className="subTitleColor mb-4">Confirm & Place Order : </p>
          </div>
          <div className="row gx-4 mb-4">
            <div className="col-lg-6 row">
              <div className="col-12 pb-2">
                <p className="mb-3 customerTxt">
                  <strong className="mb-3 me-2">Selected Store : </strong>{" "}
                  <span className="mb-3">{selectedStore?.storeLocation}</span>
                </p>
                <p className="mb-3 customerTxt">
                  <strong className="mb-3 me-2">Customer Name : </strong>
                  <span className="mb-3">{user?.data?.fullName}</span>
                </p>
                <p className="mb-3 customerTxt">
                  <strong className="mb-3 me-2">Phone Number : </strong>
                  <span className="mb-3">{user?.data?.mobileNumber}</span>
                </p>
              </div>
              <hr />
              <div className="col-12 pb-4">
                <strong className="mb-3 me-4">Payment Mode : </strong>
                <span className="mb-3 fw-bolder text-danger">
                  Pay at Location
                </span>
              </div>
              <hr />
              <div className="col-lg-4 col-md-5 col-4 text-start">
                <button
                  className="btn btn-md btn-secondary"
                  onClick={handleBackToStore}
                >
                  Back
                </button>
              </div>
              <div className="col-lg-8 col-md-7 col-8 text-end">
                <button
                  className="btn btn-md regBtn"
                  onClick={handlePickupOrder}
                >
                  Confirm & Place Order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PickupOrder;
