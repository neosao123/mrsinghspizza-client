import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";
import { orderPlace } from "../services";
import { useSelector } from "react-redux";

function Payment({ values }) {
  // const [clientSecret, setClientSecrete] = useState("");

  const { user } = useSelector((state) => state);
  console.log(user?.data?.customerCode, values);
  const paymentGateway = () => {
    const payload = {
      customerCode: user?.data?.customerCode,
      customerName: values,
      // mobileNumber: ,
    };
    orderPlace()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    paymentGateway();
    // axios
    //   .post("/creat-payment-intent", {})
    //   .then(async (res) => {
    //     const { clientSecret } = await res?.data;
    //     setClientSecrete(clientSecret);
    //   })
    //   .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {/* {stripePromises && clientSecret && (
        <Elements stripe={stripePromises} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )} */}
    </>
  );
}

export default Payment;
