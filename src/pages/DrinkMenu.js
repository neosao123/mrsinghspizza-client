import React, { useEffect, useState } from "react";
import { getDrinks } from "../services";
import Drink from "../components/_main/Drinks/Drink";
import CartFunction from "../components/cart";

function DrinkMenu() {
  const [drinksData, setDrinksData] = useState();
  const cartFn = new CartFunction();

  const drinks = async () => {
    await getDrinks()
      .then((res) => {
        setDrinksData(res.data);
      })
      .catch((err) => {
        console.log("Error from Get Drinks Data :", err);
      });
  };

  useEffect(() => {
    drinks();
  }, []);
  return (
    <>
      <div className="row gx-4 mt-3 mb-3 d-flex justify-content-center align-items-center ">
        {drinksData?.map((data, idx) => {
          return (
            <Drink
              data={data}
              idx={idx}
              key={data?.softdrinkCode}
              cartFn={cartFn}
            />
          );
        })}
      </div>
    </>
  );
}

export default DrinkMenu;
