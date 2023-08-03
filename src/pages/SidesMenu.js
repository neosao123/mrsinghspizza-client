import React, { useEffect, useState } from "react";
import Sides from "../components/_main/Sides/Sides";
import { getSides } from "../services";

function SidesMenu({ setCartProduct }) {
  const [sidesData, setSideData] = useState();

  const sides = async () => {
    await getSides()
      .then((res) => {
        setSideData(res.data);
      })
      .catch((err) => {
        console.log("Error From Get Sides :", err);
      });
  };

  useEffect(() => {
    sides();
  }, []);

  return (
    <div className="row gx-4 mt-3 mb-3">
      {sidesData?.map((data) => {
        return (
          <Sides
            data={data}
            key={data.sideCode}
            setCartProduct={setCartProduct}
          />
        );
      })}
    </div>
  );
}

export default SidesMenu;
