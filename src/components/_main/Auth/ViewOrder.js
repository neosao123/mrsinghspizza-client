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
          <div className="col-12 row mt-3 m-0 p-0">
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Order No: </span>
              <span className="contentText">{orderData?.orderCode}</span>
            </div>
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
            <div className="col-lg-4 col-md-6 col-sm-12 py-2">
              <span className="contentTitle">Order Status: </span>
              <span className="contentText">{orderData?.orderStatus}</span>
            </div>
          </div>
          <hr className="my-2"></hr>
          {/* Product Details */}
          <div className="col-12 text-start headingTitle mt-3">
            <h4>
              <strong>Product Details</strong>
            </h4>
          </div>
          <div className="col-12 mx-1 mt-3 w-100 py-2">
            <div className="table-responsive">
              <table className="table productTable table-striped">
                <thead className="text-start ">
                  <tr>
                    <th className="tableHead" scope="col">
                      Sr. No.
                    </th>
                    <th className="tableHead" scope="col">
                      Products
                    </th>
                    <th className="tableHead" scope="col">
                      Quantity
                    </th>
                    <th className="tableHead" scope="col">
                      Price
                    </th>
                    <th className="tableHead" scope="col">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderData?.orderItems &&
                  orderData?.orderItems?.length > 0 ? (
                    orderData?.orderItems?.map((order, index) => {
                      return (
                        <>
                          <tr key={order?.id}>
                            {console.log(order)}
                            <td className="tableData">{index + 1}</td>
                            <td className="tableData">
                              <p className="productName py-1">
                                {order?.productName}
                              </p>
                              {order?.productType === "sides" && (
                                <div className="mt-2">
                                  {order?.config?.size}
                                </div>
                              )}
                              {order?.productType === "customized" && (
                                <>
                                  <PizzaDetails pizzaData={order} />
                                </>
                              )}
                              {order?.productType === "special" && (
                                <>
                                  <PizzaDetails pizzaData={order} />
                                </>
                              )}
                            </td>
                            <td className="tableData">{order?.quantity}</td>
                            <td className="tableData">$ {order?.price}</td>
                            <td className="tableData">$ {order?.amount}</td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <tr>Data Not Found</tr>
                  )}
                  {/* Sub Total */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="tableHead">Sub Total :</td>
                    <td className="tableData">
                      <span>$ {orderData?.subTotal}</span>
                    </td>
                  </tr>
                  {/* Tax Percentage */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="tableHead">Tax Per :</td>
                    <td className="tableData">
                      <span>% {orderData?.taxPer}</span>
                    </td>
                  </tr>
                  {/* Tax Amount */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="tableHead">Tax Amount :</td>
                    <td className="tableData">
                      <span>$ {orderData?.taxAmount}</span>
                    </td>
                  </tr>
                  {/* Delivery Charges */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="tableHead">Delivery Charges :</td>
                    <td className="tableData">
                      <span>$ {orderData?.deliveryCharges}</span>
                    </td>
                  </tr>
                  {/* Delivery Charges */}
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td className="tableHead">Grand Total :</td>
                    <td className="tableData">
                      <span>
                        <strong>$ {orderData?.grandTotal}</strong>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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

// Pizza Details
export const PizzaDetails = ({ pizzaData }) => {
  return (
    <div>
      {pizzaData?.config?.pizza?.map((data, index) => {
        return (
          <div className="w-100">
            <div className="pizzaDetailsTitle my-1">
              {pizzaData?.productType === "special" ? "Next Pizza :" : ""}
            </div>
            {/* Crust */}
            <div className="py-1">
              <span className="pizzaDetailsTitle ">Crust : </span>
              <span>{data?.crust?.crustName}</span>
            </div>
            {/* Cheese */}
            <div className="py-1">
              <span className="pizzaDetailsTitle pt-3">Cheese : </span>
              <span>{data?.cheese?.cheeseName}</span>
            </div>
            {/* Specialbases */}
            <div className="py-1">
              <span className="pizzaDetailsTitle pt-3">Specialbases : </span>
              <span>{data?.specialbases?.specialbaseName}</span>
            </div>

            {/* Toppings */}
            <div className="py-1">
              <span className="pizzaDetailsTitle pt-3">Toppings : </span>
            </div>
            <div className="">
              {data?.toppings?.countAsTwo &&
                data?.toppings?.countAsTwo?.length > 0 && (
                  <>
                    <ToppingsDetails tpsDetails={data?.toppings?.countAsTwo} />
                  </>
                )}
              {data?.toppings?.countAsOne &&
                data?.toppings?.countAsOne?.length > 0 && (
                  <>
                    <ToppingsDetails tpsDetails={data?.toppings?.countAsOne} />
                  </>
                )}
              {data?.toppings?.freeToppings &&
                data?.toppings?.freeToppings?.length > 0 && (
                  <>
                    <ToppingsDetails
                      tpsDetails={data?.toppings?.freeToppings}
                    />
                  </>
                )}
            </div>
          </div>
        );
      })}
      {pizzaData?.config?.sides && pizzaData?.config?.sides.length > 0 && (
        <>
          <div className="py-1">
            <span className="pizzaDetailsTitle pt-3">Sides : </span>
          </div>
          {pizzaData?.config?.sides?.map((data, index) => {
            return (
              <div className="py-1">
                <span>
                  {data?.sideName} ( {data?.sideSize} )
                </span>
              </div>
            );
          })}
        </>
      )}
      {pizzaData?.config?.dips && pizzaData?.config?.dips.length > 0 && (
        <>
          <div className="py-1">
            <span className="pizzaDetailsTitle pt-3">Dips : </span>
            {pizzaData?.config?.dips?.map((data, index) => {
              return (
                <span>
                  {data?.dipsName}{" "}
                  {pizzaData?.config?.dips.length - 1 === index ? "" : ","}
                </span>
              );
            })}
          </div>
        </>
      )}
      {pizzaData?.config?.drinks && pizzaData?.config?.drinks.length > 0 && (
        <>
          <div className="py-1">
            <span className="pizzaDetailsTitle pt-3">Drinks : </span>
            {pizzaData?.config?.drinks?.map((data, index) => {
              return (
                <span>
                  {data?.drinksName}
                  {pizzaData?.config?.drinks.length - 1 === index ? "" : ","}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const ToppingsDetails = ({ tpsDetails }) => {
  return (
    <div>
      {tpsDetails?.map((data) => {
        return (
          <div className="w-100 row py-1">
            <div className="col-8">
              <span>{data?.toppingsName} </span>
              <span>
                ({" "}
                {data.toppingsPlacement === "Whole"
                  ? "W"
                  : data.toppingsPlacement === "Left Half"
                  ? "L"
                  : data.toppingsPlacement === "1/4"
                  ? "1/4"
                  : "R"}{" "}
                )
              </span>
            </div>
            <div className="col-4 text-end">
              <span>
                ${" "}
                {data?.amount
                  ? Number(data?.amount).toFixed(2)
                  : data?.toppingsPrice}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
