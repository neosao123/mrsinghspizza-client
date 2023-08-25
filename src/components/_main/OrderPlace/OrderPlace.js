import React, { useContext, useEffect } from "react";
import { deliverable, orderPlace } from "../../../services";
import GlobalContext from "../../../context/GlobalContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

function OrderPlace({ values }) {
  const { user } = useSelector((state) => state);
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const navigate = useNavigate();

  const paymentGateway = (values) => {
    let custFullName = values.firstname + " " + values?.lastname;
    console.log(process.env.REACT_APP_CALLBACKURL);
    const payload = {
      callbackUrl: process.env.REACT_APP_CALLBACKURL,
      cancelUrl: process.env.REACT_APP_CANCEL,
      customerCode: user?.data?.customerCode,
      customerName: custFullName,
      mobileNumber: values?.phoneno,
      address: values?.address,
      zipCode: values?.postalcode,
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
        localStorage.setItem("OrderID", response.orderCode);
        localStorage.setItem("sessionId", response.sessionId);
        window.open(response?.paymentUrl, "_blank");
      })
      .catch((error) => {
        if (error.response.status === 400 || error.response.status === 500) {
          toast.error(error.response.data.message);
        }
      });
  };
  const placeOrder = async () => {
    await deliverable({ zipcode: values.postalcode })
      .then((res) => {
        if (res?.deliverable === true) {
          paymentGateway(values);
        } else {
          swal({
            title: "Postal Code is Undeliverable",
            text: `postal code cannot deliverable. Please change the postal code and try again`,
            icon: "warning",
            buttons: ["Cancel", "Ok"],
            dangerMode: true,
          }).then(async (willOk) => {
            if (willOk) {
            } else {
              navigate("/");
            }
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    placeOrder();
  }, []);
}

export default OrderPlace;
