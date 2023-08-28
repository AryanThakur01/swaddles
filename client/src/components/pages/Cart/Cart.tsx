import { FC, useEffect, useState } from "react";
import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import OrderCard from "../../cards/OrderCard";
import { getCartApi } from "../../../Api/Cart";
import { ICart } from "../../../interfaces/interface";
import LoadingSkeleton from "../../UI/LoadingSkeleton";
import { Link, useNavigate } from "react-router-dom";

const Cart: FC = () => {
  const [orderList, setOrderList] = useState<ICart[]>();
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [discountPrice, setDiscountPrice] = useState<number>(0);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [searchingProducts, setSearchingProducts] = useState<boolean>(false);

  const navigate = useNavigate();

  const checkoutHandler = () => {
    if (!orderList) return;
    const lastElement = orderList.length
    let checkoutData: string | string[] = []
    for (let index = 0; index < lastElement; index++) {
      let productData = {order: orderList[index].item._id, qty: orderList[index].quantity};
      checkoutData.push(JSON.stringify(productData));
    }
    checkoutData = JSON.stringify(checkoutData)
    navigate("/checkout?search="+checkoutData)
  };
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
      tempRetailPrice - tempDiscountPrice <= 400 ? 0 : 40;

    setOrderList(cart);
    setRetailPrice(tempRetailPrice);
    setDiscountPrice(tempDiscountPrice);
    setDeliveryCharges(tempDeliveryCharges);
    setQuantity(tempQuantity);
  };
  useEffect(() => {
    setSearchingProducts(true);
    getCartProducts();
    setSearchingProducts(false);
  }, []);

  return (
    <div>
      <Navigation />

      <div className="my-20 md:mx-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 md:col-span-2 rounded-sm flex flex-col gap-3 shadow-md">
          {!orderList || searchingProducts ? (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          ) : (
            orderList.map((product: ICart) => (
              <OrderCard
                key={product.item._id}
                {...product.item}
                quantity={product.quantity}
                uniqueId={product._id ? product._id : ""}
                getCartProducts={getCartProducts}
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
              <p className="text-primary_dark">₹ {retailPrice.toLocaleString()}</p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Discount</p>
              <p className="text-success font-bold">
                -₹ {(retailPrice - discountPrice).toLocaleString()}
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
              <p>₹ {(discountPrice + deliveryCharges).toLocaleString()}</p>
            </div>
            <hr className="my-6" />
            <p className="text-success font-bold tracking-wider text-center">
              You will save <b>₹ {(retailPrice - discountPrice).toLocaleString()}</b> on this
              purchase
            </p>
            {orderList && (
              <button
                className="bg-success p-2 my-10 w-full text-xl text-primary_white font-bold"
                onClick={checkoutHandler}
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
