import { toast } from "react-toastify";

export default class CartFunction {
  createCart(setCart) {
    if (localStorage.getItem("cart") === null) {
      let sub = 0.0;
      let discount = 0.0;
      let taxPer = 0.0;
      let gTotal = 0.0;
      const currentCart = {
        product: [],
        subtotal: sub.toFixed(2),
        discount: Number(discount).toFixed(2),
        taxPer: taxPer,
        grandtotal: gTotal.toFixed(2),
      };
      localStorage.setItem("cart", JSON.stringify(currentCart));
      setCart(currentCart);
    }
  }
  addCart(cartProduct, setCart, isEdit) {
    if (localStorage.getItem("cart") && localStorage.getItem("cart") !== null) {
      if (cartProduct.length > 0) {
        let sub = 0.0;
        let discount = 0.0;
        let taxPer = 2.2;
        cartProduct.map((data) => {
          sub = Number(sub) + Number(data?.totalPrice);
        });

        let disAmount = Number(sub) - Number(discount);
        let taxAmount = (disAmount * taxPer) / 100;
        let gTotal = Number(disAmount) + Number(taxAmount);

        const currentCart = {
          product: cartProduct,
          subtotal: sub.toFixed(2),
          discount: Number(discount).toFixed(2),
          taxPer: taxPer,
          grandtotal: gTotal.toFixed(2),
        };

        localStorage.setItem("cart", JSON.stringify(currentCart));
        setCart(currentCart);
        {
          isEdit === true
            ? toast.success("Product Updated Successfully...")
            : toast.success("Product Added Successfully...");
        }
      }
    }
  }
  deleteCart(cartProduct, cart, setCart) {
    if (localStorage.getItem("cart") && localStorage.getItem("cart") !== null) {
      if (cartProduct) {
        let sub = 0.0;
        let discount = 0.0;
        let taxPer = 2.2;
        const filteredProduct = cart?.product?.filter(
          (items) => items?.productID !== cartProduct.productID
        );
        filteredProduct.map((data) => {
          sub = Number(sub) + Number(data?.totalPrice);
        });
        let disAmount = Number(sub) - Number(discount);
        let taxAmount = (disAmount * taxPer) / 100;
        let gTotal = Number(disAmount) + Number(taxAmount);
        const currentCart = {
          product: filteredProduct,
          subtotal: sub.toFixed(2),
          discount: Number(discount).toFixed(2),
          taxPer: taxPer,
          grandtotal: gTotal.toFixed(2),
        };
        localStorage.setItem("cart", JSON.stringify(currentCart));
        setCart(currentCart);
        toast.error("Product Deleted Successfully...");
      }
    }
  }
}
