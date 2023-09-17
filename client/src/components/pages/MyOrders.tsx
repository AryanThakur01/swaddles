import { FC, useEffect, useState } from "react";
import AccountNavigation from "../UI/ProfileNavigation";
import Navigation from "../UI/Navigation";
import { getMyOrdersApi } from "../../Api/Products";
import { IMyOrders, IProducts } from "../../interfaces/interface.tsx";
import { FaLocationArrow, FaUser } from "react-icons/fa";

interface IProductCardData extends IProducts {
  qty: number;
  status: "pending" | "fulfilled" | "active";
}

const MyOrders: FC = () => {
  const [orders, setOrders] = useState<IMyOrders[] | undefined>();
  const MyOrders = async () => {
    try {
      const data = await getMyOrdersApi();
      const tempOrders: IMyOrders[] = data.myOrders;
      setOrders(tempOrders || []);
    } catch (error) {
      console.error(error);
    }
  };

  const ItemCard: FC<IProductCardData> = ({
    brand,
    image,
    product_name,
    retail_price,
    discounted_price,
    qty,
    status,
  }) => {
    return (
      <div className="flex justify-between gap-4 bg-white p-5 rounded">
        <div className="flex gap-4">
          <div
            className={`absolute w-4 h-4 rounded-full ${
              (status === "active" && "bg-success") ||
              (status === "pending" && "bg-orange-400")
            }`}
          />
          <div className="h-28 w-28 flex justify-center items-center overflow-hidden bg-white rounded shadow">
            <img src={image[0]} className="max-h-full" />
          </div>
          <div className="flex flex-col justify-between text-lg">
            <h2>{product_name}</h2>
            <p className="text-secondary_dark">&times; {qty}</p>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-5">
          <p>₹ {discounted_price.toLocaleString()}</p>
        </div>
      </div>
    );
  };
  useEffect(() => {
    MyOrders();
  }, []);
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="myOrders">
        <div className="flex flex-col gap-4 min-h-[60vh]">
          {!orders ||
            (orders.length === 0 && (
              <p className="text-center my-32">No Orders Found</p>
            ))}
          {orders?.map((order) => (
            <div
              className="bg-primary_white p-3 flex flex-col gap-2 rounded shadow-inner"
              key={order._id}
            >
              <div className="flex gap-3 items-center">
                <div className="text-tertiary_dark">
                  <FaUser />
                </div>
                <p>{order.username}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-tertiary_dark">
                  <FaLocationArrow />
                </div>
                <p>
                  {order.address} {order.city}, {order.state},{" "}
                  {order.postalCode}
                </p>
              </div>
              <hr className="border" />
              {order.Items &&
                order.Items.map((it) => (
                  <ItemCard
                    key={it._id}
                    {...it.order}
                    qty={it.qty}
                    status={order.status}
                  />
                ))}
            </div>
          ))}
        </div>
        {/* {JSON.stringify(orders)} */}
      </AccountNavigation>
    </>
  );
};

export default MyOrders;
