import React, { useEffect, useState } from "react";
import { getDrinks } from "../services";
import Drink from "../components/_main/Drinks/Drink";

function DrinkMenu({ setCartProduct }) {
  const [drinksData, setDrinksData] = useState();

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
              setCartProduct={setCartProduct}
            />
          );
        })}
      </div>
    </>
  );
}

export default DrinkMenu;
