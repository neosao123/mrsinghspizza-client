import React, { useEffect, useState } from "react";
import Dips from "../components/_main/Dips/Dips";
import { getDips } from "../services";
import CartFunction from "../components/cart";

function DipsMenu() {
  const [dipsData, setDipsData] = useState();
  const cartFn = new CartFunction();

  const dips = async () => {
    await getDips()
      .then((res) => {
        setDipsData(res.data);
      })
      .catch((err) => {
        console.log("Error From Dips Menu : ", err);
      });
  };

  useEffect(() => {
    dips();
  }, []);
  return (
    <div className="row gx-4 d-flex justify-content-xl-center justify-content-start mt-3 mb-3">
      {dipsData?.map((data) => {
        return <Dips key={data.dipsCode} data={data} cartFn={cartFn} />;
      })}
    </div>
  );
}

export default DipsMenu;
