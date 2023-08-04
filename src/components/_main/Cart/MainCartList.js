import React from "react";

function MainCartList({ cData }) {
  return (
    <li className="list-group-item cartlistitem d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center py-2">
        <div className="mx-4">
          <h5 className="mb-2">{cData.productName}</h5>
          <p className="text-secondary mb-2">
            {cData.size ? (
              <>
                Size : <span className="mx-1">{cData.size}</span>
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
        <h5 className="d-inline mx-4">$ {cData.totalPrice}</h5>
        <i className="fa fa-trash deleteIcon mx-3" aria-hidden="true"></i>
        {cData.productType === "special" ||
        cData.productType === "customized" ? (
          <i className="fa fa-edit editIcon" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-edit editIcon d-none" aria-hidden="true"></i>
        )}
      </div>
    </li>
  );
}

export default MainCartList;
