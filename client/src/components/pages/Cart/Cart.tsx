import { useEffect, useState } from "react";
import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import OrderCard from "../../cards/OrderCard";
import { getCartApi } from "../../../Api/Cart";
import { ICart } from "../../../interfaces/interface";
import LoadingSkeleton from "../../UI/LoadingSkeleton";

const Cart = () => {
  const [orderList, setOrderList] = useState<ICart[]>();
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  const getCartProducts = async () => {
    const cart: ICart[] = await getCartApi();
    let tempRetailPrice = 0;
    let tempDiscountPrice = 0;
    let tempQuantity = 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i].item;
      tempQuantity += cart[i].quantity;
      tempRetailPrice += item.retail_price * cart[i].quantity;
      tempDiscountPrice += item.discounted_price * cart[i].quantity;
    }
    let tempDeliveryCharges =
      tempRetailPrice - tempDiscountPrice >= 400 ? 0 : 40;

    setOrderList(cart);
    setRetailPrice(tempRetailPrice);
    setDiscountPrice(tempDiscountPrice);
    setDeliveryCharges(tempDeliveryCharges);
    setQuantity(tempQuantity);
  };
  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="my-20 mx-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 md:col-span-2 rounded-sm flex flex-col gap-3 shadow-md">
          {!orderList ? (
            <>
              <LoadingSkeleton />
            </>
          ) : (
            orderList.map((product: ICart) => (
              <OrderCard
                key={product.item._id}
                {...product.item}
                quantity={product.quantity}
              />
            ))
          )}
        </div>
        <div className="bg-white p-3 rounded-sm shadow-md">
          <div className="bg-primary_white w-full h-full rounded-sm p-3 shadow-inner">
            <h2 className="text-secondary_dark text-xl">Price Details</h2>
            <hr className="my-2" />
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Price({quantity} Items)</p>
              <p className="text-primary_dark">₹ {retailPrice}</p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Discount</p>
              <p className="text-success font-bold">
                -₹ {retailPrice - discountPrice}
              </p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Delivery Charges</p>
              <p
                className={`${
                  deliveryCharges != 40 && "text-success"
                } font-bold`}
              >
                {deliveryCharges != 40 ? "Free" : "₹ " + deliveryCharges}
              </p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between my-2 text-primary_dark font-bold text-2xl">
              <p>Total Amount</p>
              <p>₹ {discountPrice + deliveryCharges}</p>
            </div>
            <hr className="my-6" />
            <p className="text-success font-bold tracking-wider text-center">
              You will save <b>₹ {retailPrice - discountPrice}</b> on this
              purchase
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
