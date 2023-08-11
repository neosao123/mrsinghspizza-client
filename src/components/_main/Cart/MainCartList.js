import React, { useContext } from "react";
import GlobalContext from "../../../context/GlobalContext";
import CartFunction from "../../cart";

function MainCartList({ cData }) {
  const globalctx = useContext(GlobalContext);
  const [cart, setCart] = globalctx.cart;
  const cartFn = new CartFunction();

  const handleDelete = () => {
    cartFn.deleteCart(cData, cart, setCart);
  };
  return (
    <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center py-2">
        <div className="mx-4">
          <h5 className="mb-2">{cData.productName}</h5>
          <p className="text-secondary mb-2">
            {cData?.size || cData?.pizzaSize ? (
              <>
                Size :{" "}
                <span className="mx-1">{cData?.size || cData?.pizzaSize}</span>
              </>
            ) : (
              ""
            )}
          </p>
          <p className="text-secondary mb-2">
            Quantity : <span className="mx-1">{cData.quantity}</span>
          </p>
        </div>
      </div>
      <div className="mx-4">
        <h5 className="d-inline text-start mx-4">$ {cData.totalPrice}</h5>
        <div className="d-inline">
          <i
            className="fa fa-trash deleteIcon mx-3"
            aria-hidden="true"
            onClick={handleDelete}
          ></i>
          {cData.productType === "special" ||
          cData.productType === "customized" ? (
            <i className="fa fa-edit  editIcon" aria-hidden="true"></i>
          ) : (
            <i className="fa fa-edit editIcon d-none" aria-hidden="true"></i>
          )}
        </div>
      </div>
    </li>
  );
}

export default MainCartList;
