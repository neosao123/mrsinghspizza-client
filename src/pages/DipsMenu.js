import React, { useEffect, useState } from "react";
import Dips from "../components/_main/Dips/Dips";
import { getDips } from "../services";

function DipsMenu({ setCartProduct }) {
  const [dipsData, setDipsData] = useState();

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
    <div className="row gx-4 d-flex justify-content-center mt-3 mb-3">
      {dipsData?.map((data) => {
        return (
          <Dips
            key={data.dipsCode}
            data={data}
            setCartProduct={setCartProduct}
          />
        );
      })}
    </div>
  );
}

export default DipsMenu;
