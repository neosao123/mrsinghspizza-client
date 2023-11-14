import React, { useEffect, useState } from "react";
import { getOrderDetails } from "../../../services";
import { toast } from "react-toastify";
import moment from "moment/moment";
import LoadingLayout from "../../../../src/layouts/LoadingLayout";
import "../../../assets/styles/MyAccount/viewOrder.css";
import { data } from "jquery";

function ViewOrder({ selectedCode }) {
  const [orderData, setOrderData] = useState();
  const [loading, setLoading] = useState(false);

  // Convert ISO DateTime Into Another Format Using Moment.js
  const formattedDateTime = moment(orderData?.created_at).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  const orderDetailsAPI = () => {
    setLoading(true);
    getOrderDetails({ orderCode: selectedCode })
      .then((res) => {
        setOrderData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    orderDetailsAPI();
  }, []);

  // console.log(orderData);
  return (
    <>
      {loading === false ? (
        <div className="container-fluid w-100 row justify-content-center my-2">
          {/* Order Details */}
          <div className="col-12 text-start headingTitle">
            <h4>
              <strong>Order Details</strong>
            </h4>
          </div>
          {orderData?.orderStatus === "placed" ? (
            <>
              <div
                className="col-12 rounded row mt-3 m-0 p-0 py-1"
                style={{ backgroundColor: "#deffde" }}
              >
                <div className="col-lg-4 col-md-6 col-sm-12 py-2">
                  <span className="contentTitle">Order No: </span>
                  <span className="contentText fw-bold">
                    {orderData?.orderCode}
                  </span>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 py-2">
                  <span className="contentTitle">Order Status: </span>
                  <span className="contentText fw-bold text-success">
                    {orderData?.orderStatus}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className="col-12 rounded row mt-3 m-0 p-0 py-1"
                style={{ backgroundColor: "#ffd1d83d" }}
              >
                <div className="col-lg-4 col-md-6 col-sm-12 py-2">
                  <span className="contentTitle">Order No: </span>
                  <span className="contentText fw-bold">
                    {orderData?.orderCode}
                  </span>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12 py-2">
                  <span className="contentTitle">Order Status: </span>
                  <span className="contentText fw-bold text-danger">
                    {orderData?.orderStatus}
                  </span>
                </div>
              </div>
            </>
          )}

          <div className="col-12 row m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Date: </span>
              <span className="contentText">{formattedDateTime}</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Order From: </span>
              <span className="contentText">{orderData?.orderFrom}</span>
            </div>
          </div>
          <div className="col-12 row m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Phone Number: </span>
              <span className="contentText">{orderData?.mobileNumber}</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Name: </span>
              <span className="contentText">{orderData?.customerName}</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Address: </span>
              <span className="contentText">{orderData?.address}</span>
            </div>
          </div>
          <div className="col-12 row m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Postal Code: </span>
              <span className="contentText">{orderData?.zipCode}</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Delivery Type: </span>
              <span className="contentText">{orderData?.deliveryType}</span>
            </div>
          </div>
          <hr className="my-2"></hr>
          {/* Product Details */}
          <div className="col-12 text-start headingTitle mt-3">
            <h4>
              <strong>Product Details</strong>
            </h4>
          </div>
          <div className="col-12 mx-1 mt-3 py-2">
            <div className="w-100 mainDiv">
              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails">
                <div className="text-start fw-bold products mx-1">Products</div>
                <div className="text-center fw-bold qty mx-1">Quantity</div>
                <div className="text-center fw-bold amount mx-1">Amount</div>
              </div>

              {orderData?.orderItems && orderData?.orderItems?.length > 0 ? (
                orderData?.orderItems?.map((order, index) => {
                  return (
                    <>
                      <div className="w-auto py-1 d-flex justify-content-around productDetails contentDiv">
                        <div
                          className="products d-flex justify-content-start mx-1"
                          key={order?.id}
                        >
                          <span className="productName p-0">
                            {order?.productName}
                          </span>
                        </div>
                        <div
                          className="text-center orderSummaryText qty mx-1"
                          key={order?.id}
                        >
                          {order?.quantity}
                        </div>
                        <div
                          className="text-center orderSummaryText amount mx-1"
                          key={order?.id}
                        >
                          ${" "}
                          {order?.productType === "special_pizza" ||
                          order?.productType === "custom_pizza"
                            ? order?.pizzaPrice
                            : order?.amount}
                        </div>
                      </div>

                      {order?.productType === "side" && (
                        <div className="w-auto d-flex justify-content-around productDetails">
                          <div
                            className="products d-flex justify-content-start mx-1"
                            key={order?.id}
                          >
                            <span className="subText">
                              {order?.config?.sidesSize}
                            </span>
                          </div>
                          <div className="text-center qty mx-1" key={order?.id}>
                            {" "}
                          </div>
                          <div
                            className="text-center amount mx-1"
                            key={order?.id}
                          >
                            {" "}
                          </div>
                        </div>
                      )}

                      {(order?.productType === "side" ||
                        order?.productType === "dips" ||
                        order?.productType === "drinks") && (
                        <div className="w-auto d-flex justify-content-around productDetails">
                          <div
                            className="products d-flex justify-content-start mx-1"
                            key={order?.id}
                          >
                            <span className="subText">
                              <strong>Comments : </strong>
                              {order?.comments}
                            </span>
                          </div>
                          <div className="text-center qty mx-1" key={order?.id}>
                            {" "}
                          </div>
                          <div
                            className="text-center amount mx-1"
                            key={order?.id}
                          >
                            {" "}
                          </div>
                        </div>
                      )}

                      {(order?.productType === "custom_pizza" ||
                        order?.productType === "special_pizza") &&
                        order?.config?.pizza?.map((data, index) => {
                          return (
                            <>
                              {/* Next Pizza */}
                              {order?.productType === "special_pizza" &&
                              index > 0 ? (
                                <div className="w-auto d-flex justify-content-around productDetails">
                                  <div className="products d-flex justify-content-start mx-1">
                                    <span className="subText fw-Bold">
                                      <strong>Next Pizza</strong>
                                    </span>
                                    <span className="subText mx-2"></span>
                                  </div>
                                  <div className="text-center qty mx-1"> </div>
                                  <div className="text-center amount mx-1"></div>
                                </div>
                              ) : null}

                              {/* Crust */}
                              {data?.crust &&
                                data?.crust?.crustName !== "Regular" && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText fw-Bold">
                                        <strong>Crust :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.crust?.crustName}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.crust?.price) !== 0
                                        ? "$ " + data?.crust?.price
                                        : ""}
                                    </div>
                                  </div>
                                )}

                              {/* Crust Type */}
                              {data?.crustType &&
                                data?.crustType?.crustType !== "Regular" && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText fw-Bold">
                                        <strong>Crust Type :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.crustType?.crustType}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.crustType?.price) !== 0
                                        ? "$ " + data?.crustType?.price
                                        : ""}
                                    </div>
                                  </div>
                                )}

                              {/* Cheese */}
                              {data?.cheese &&
                                data?.cheese?.cheeseName !== "Mozzarella" && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText">
                                        <strong>Cheese :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.cheese?.cheeseName}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.cheese?.price) !== 0
                                        ? "$ " + data?.cheese?.price
                                        : ""}
                                    </div>
                                  </div>
                                )}

                              {/* Specialbases */}
                              {data?.specialBases &&
                                (Object.keys(data?.specialBases).length !== 0 ||
                                  data?.specialBases?.length !== 0) && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText">
                                        <strong>Specialbases :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.specialBases?.specialbaseName}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.specialBases?.price) !== 0
                                        ? "$ " + data?.specialBases?.price
                                        : ""}
                                    </div>
                                  </div>
                                )}

                              {/* Spicy */}
                              {data?.spicy &&
                                data?.spicy?.spicy !== "Regular" && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText">
                                        <strong>Spicy :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.spicy?.spicy}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.spicy?.price) !== 0
                                        ? "$ " + data?.spicy?.price
                                        : ""}{" "}
                                    </div>
                                  </div>
                                )}

                              {/* Sauce */}
                              {data?.sauce &&
                                data?.sauce?.sauce !== "Regular" && (
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText">
                                        <strong>Sauce :</strong>
                                      </span>
                                      <span className="subText mx-2">
                                        {data?.sauce?.sauce}
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {Number(data?.sauce?.price) !== 0
                                        ? "$ " + data?.sauce?.price
                                        : ""}{" "}
                                    </div>
                                  </div>
                                )}

                              {/* Cook */}
                              {data?.cook && data?.cook?.cook !== "Regular" && (
                                <div className="w-auto d-flex justify-content-around productDetails">
                                  <div className="products d-flex justify-content-start mx-1">
                                    <span className="subText">
                                      <strong>Cook :</strong>
                                    </span>
                                    <span className="subText mx-2">
                                      {data?.cook?.cook}
                                    </span>
                                  </div>
                                  <div className="text-center qty mx-1"> </div>
                                  <div className="text-center amount mx-1">
                                    {Number(data?.cook?.price) !== 0
                                      ? "$ " + data?.cook?.price
                                      : ""}
                                  </div>
                                </div>
                              )}

                              {/* Toppings */}
                              {(data?.toppings?.countAsTwoToppings.length > 0 ||
                                data?.toppings?.countAsOneToppings.length > 0 ||
                                data?.toppings?.freeToppings.length > 0) && (
                                <>
                                  <div className="w-auto d-flex justify-content-around productDetails">
                                    <div className="products d-flex justify-content-start mx-1">
                                      <span className="subText">
                                        <strong>Toppings :</strong>
                                      </span>
                                    </div>
                                    <div className="text-center qty mx-1">
                                      {" "}
                                    </div>
                                    <div className="text-center amount mx-1">
                                      {" "}
                                    </div>
                                  </div>
                                </>
                              )}

                              {data?.toppings?.countAsTwoToppings &&
                                data?.toppings?.countAsTwoToppings?.length >
                                  0 && (
                                  <>
                                    <ToppingsDetails
                                      tpsDetails={
                                        data?.toppings?.countAsTwoToppings
                                      }
                                      count={2}
                                    />
                                  </>
                                )}

                              {data?.toppings?.countAsOneToppings &&
                                data?.toppings?.countAsOneToppings?.length >
                                  0 && (
                                  <>
                                    <ToppingsDetails
                                      tpsDetails={
                                        data?.toppings?.countAsOneToppings
                                      }
                                      count={1}
                                    />
                                  </>
                                )}

                              {data?.toppings?.freeToppings &&
                                data?.toppings?.freeToppings?.length > 0 && (
                                  <>
                                    {data?.toppings?.isAllIndiansTps ===
                                    true ? (
                                      <>
                                        <div className="w-auto d-flex justify-content-around productDetails">
                                          <div className="products d-flex justify-content-start mx-1">
                                            <span className="subText">
                                              <strong>
                                                Indian Style + Coriander
                                              </strong>
                                            </span>
                                          </div>
                                          <div className="text-center qty mx-1">
                                            {" "}
                                          </div>
                                          <div className="text-center amount mx-1">
                                            {" "}
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <ToppingsDetails
                                        tpsDetails={
                                          data?.toppings?.freeToppings
                                        }
                                        count={0}
                                      />
                                    )}
                                  </>
                                )}
                            </>
                          );
                        })}

                      {(order?.productType === "custom_pizza" ||
                        order?.productType === "special_pizza") && (
                        <>
                          {order?.config?.sides &&
                            order?.config?.sides.length > 0 && (
                              <>
                                <div className="w-auto d-flex justify-content-around productDetails">
                                  <div className="products d-flex justify-content-start mx-1">
                                    <span className="subText">
                                      <strong>Sides :</strong>
                                    </span>
                                  </div>
                                  <div className="text-center qty mx-1"> </div>
                                  <div className="text-center amount mx-1">
                                    {" "}
                                  </div>
                                </div>
                                {order?.config?.sides?.map((data, index) => {
                                  return (
                                    <div className="w-auto d-flex justify-content-around productDetails">
                                      <div className="products d-flex justify-content-start mx-1">
                                        <span className="subText">
                                          {data?.sideName} ( {data?.sideSize} )
                                        </span>
                                      </div>
                                      <div className="text-center qty mx-1">
                                        {data?.quantity}
                                      </div>
                                      <div className="text-center amount mx-1">
                                        {Number(data?.totalPrice) !== 0
                                          ? "$ " + data?.totalPrice
                                          : ""}
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}

                          {order?.config?.dips &&
                            order?.config?.dips.length > 0 && (
                              <>
                                <div className="w-auto d-flex justify-content-around productDetails">
                                  <div className="products d-flex justify-content-start mx-1">
                                    <span className="subText">
                                      <strong>Dips :</strong>
                                    </span>
                                  </div>
                                  <div className="text-center qty mx-1"> </div>
                                  <div className="text-center amount mx-1">
                                    {" "}
                                  </div>
                                </div>
                                {order?.config?.dips?.map((data, index) => {
                                  return (
                                    <div className="w-auto d-flex justify-content-around productDetails">
                                      <div className="products d-flex justify-content-start mx-1">
                                        <span className="subText">
                                          {data?.dipsName}{" "}
                                          {order?.config?.dips.length - 1 ===
                                          index
                                            ? ""
                                            : ","}
                                        </span>
                                      </div>
                                      <div className="text-center qty mx-1">
                                        {data?.quantity}
                                      </div>
                                      <div className="text-center amount mx-1">
                                        {Number(data?.totalPrice) !== 0
                                          ? "$ " + data?.totalPrice
                                          : ""}
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}

                          {order?.config?.drinks &&
                            order?.config?.drinks.length > 0 && (
                              <>
                                <div className="w-auto d-flex justify-content-around productDetails">
                                  <div className="products d-flex justify-content-start mx-1">
                                    <span className="subText">
                                      <strong>Drinks :</strong>
                                    </span>
                                  </div>
                                  <div className="text-center qty mx-1"> </div>
                                  <div className="text-center amount mx-1">
                                    {" "}
                                  </div>
                                </div>
                                {order?.config?.drinks?.map((data, index) => {
                                  return (
                                    <div className="w-auto d-flex justify-content-around productDetails">
                                      <div className="products d-flex justify-content-start mx-1">
                                        <span className="subText">
                                          {data?.drinksName}
                                          {order?.config?.drinks.length - 1 ===
                                          index
                                            ? ""
                                            : ","}
                                        </span>
                                      </div>
                                      <div className="text-center qty mx-1">
                                        {data?.quantity}
                                      </div>
                                      <div className="text-center amount mx-1">
                                        {Number(data?.totalPrice) !== 0
                                          ? "$ " + data?.totalPrice
                                          : ""}
                                      </div>
                                    </div>
                                  );
                                })}
                              </>
                            )}
                        </>
                      )}

                      {(order?.productType === "custom_pizza" ||
                        order?.productType === "special_pizza") &&
                        order?.comments !== "" && (
                          <>
                            <div className="w-auto d-flex justify-content-around productDetails">
                              <div
                                className="products d-flex justify-content-start mx-1"
                                key={order?.id}
                              >
                                <span className="subText">
                                  <strong>Comments : </strong>
                                  {order?.comments}
                                </span>
                              </div>
                              <div
                                className="text-center qty mx-1"
                                key={order?.id}
                              >
                                {" "}
                              </div>
                              <div
                                className="text-center amount mx-1"
                                key={order?.id}
                              >
                                {" "}
                              </div>
                            </div>
                          </>
                        )}

                      <hr
                        className="m-0 p-0 my-1"
                        style={{
                          height: "1px !important",
                        }}
                      />
                    </>
                  );
                })
              ) : (
                <>
                  <div className="w-100 text-center fw-bold amount">
                    No Data Found
                  </div>
                </>
              )}

              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails">
                <div className="text-end orderSummaryTitle fw-bold subTotal mx-1">
                  Sub Total :
                </div>
                <div className="text-center amount mx-1">
                  <span className="orderSummaryText">
                    $ {orderData?.subTotal}
                  </span>
                </div>
              </div>
              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails">
                <div className="text-end orderSummaryTitle fw-bold taxPer mx-1">
                  Tax Percentage (%) :
                </div>
                <div className="text-center orderSummaryText fw-bold amount mx-1">
                  {orderData?.taxPer}
                </div>
              </div>
              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails">
                <div className="text-end orderSummaryTitle fw-bold taxAmount mx-1">
                  Tax Amount :
                </div>
                <div className="text-center orderSummaryText fw-bold amount mx-1">
                  $ {orderData?.taxAmount}
                </div>
              </div>
              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails">
                <div className="text-end fw-bold orderSummaryTitle deliveryCharge mx-1">
                  Delivery Charges :
                </div>
                <div className="text-center orderSummaryText fw-bold amount mx-1">
                  $ {orderData?.deliveryCharges}
                </div>
              </div>
              <div className="bg-light w-auto py-2 d-flex justify-content-around productDetails border-top">
                <div className="text-end fw-bold orderSummaryTitle grandTotal mx-1">
                  Grand Total :
                </div>
                <div className="text-center orderSummaryText fw-bold amount mx-1">
                  $ {orderData?.grandTotal}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <LoadingLayout />
      )}
    </>
  );
}

export default ViewOrder;

export const ToppingsDetails = ({ tpsDetails, count }) => {
  return (
    <>
      {tpsDetails?.map((data) => {
        return (
          <>
            <div className="w-auto d-flex justify-content-around productDetails">
              <div className="products d-flex justify-content-start mx-1">
                {count === 2 ? (
                  <>
                    (<span className="subText px-1">2</span>)
                  </>
                ) : (
                  ""
                )}
                <span className="subText mx-1">{data?.toppingsName} </span>
                <strong>
                  <span className="subText">
                    (
                    {data.toppingsPlacement === "whole"
                      ? "W"
                      : data.toppingsPlacement === "lefthalf"
                      ? "L"
                      : data.toppingsPlacement === "1/4"
                      ? "1/4"
                      : "R"}
                    )
                  </span>
                </strong>
              </div>
              <div className="text-center qty mx-1"> </div>
              <div className="text-center amount mx-1">
                {Number(data?.amount) !== undefined &&
                Number(data?.amount) !== 0
                  ? "$ " + Number(data?.amount)
                  : ""}
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
