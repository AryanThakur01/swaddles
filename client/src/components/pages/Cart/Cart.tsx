import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import OrderCard from "../../cards/OrderCard";

const Cart = () => {
  return (
    <div>
      <Navigation />
      <div className="my-20 mx-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-white p-3 md:col-span-2 rounded-sm flex flex-col gap-3 shadow-md">
          <OrderCard />
          <OrderCard />
        </div>
        <div className="bg-white p-3 rounded-sm shadow-md">
          <div className="bg-primary_white w-full h-full rounded-sm p-3 shadow-inner">
            <h2 className="text-secondary_dark text-xl">Price Details</h2>
            <hr className="my-2" />
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Price(15 Items)</p>
              <p className="text-primary_dark">$500</p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Discount</p>
              <p className="text-success font-bold">-$100</p>
            </div>
            <div className="flex justify-between my-2 text-secondary_dark">
              <p>Delivery Charges</p>
              <p className={`text-success font-bold`}>Free</p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-between my-2 text-primary_dark font-bold text-2xl">
              <p>Total Amount</p>
              <p>$400</p>
            </div>
            <hr className="my-6" />
            <p className="text-success font-bold tracking-wider text-center">
              You will save $100 on this purchase
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
