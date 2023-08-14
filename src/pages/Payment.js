import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";

const stripePromises = loadStripe(
  "pk_test_51L1pYuSCkVwYsB1d6QJQG9CZ3z8IdebGflVdOU3SoYS9WuIvFeVt3N7LUfmPqFJdAmayhBLjvitVyHDwlfl8OYIu00qtmTFtbs"
);

function Payment() {
  const [clientSecret, setClientSecrete] = useState("");
  useEffect(() => {
    axios
      .post("/creat-payment-intent", {})
      .then(async (res) => {
        const { clientSecret } = await res?.data;
        setClientSecrete(clientSecret);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      {stripePromises && clientSecret && (
        <Elements stripe={stripePromises} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
