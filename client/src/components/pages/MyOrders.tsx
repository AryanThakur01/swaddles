import { FC, useEffect, useState } from "react";
import AccountNavigation from "../UI/ProfileNavigation";
import Navigation from "../UI/Navigation";
import { getMyOrdersApi } from "../../Api/Products";
import { IMyOrders } from "../../interfaces/interface.tsx";

const MyOrders: FC = () => {
  const [orders, setOrders] = useState<IMyOrders[] | undefined>();
  const MyOrders = async () => {
    try {
      const data = await getMyOrdersApi();
      const tempOrders: IMyOrders[] = data.myOrders;
      console.log(tempOrders);
      setOrders(tempOrders || []);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    MyOrders();
  }, []);
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="myOrders">
        <div className="flex flex-col gap-2">
          {orders?.map((order) => (
            <div className="bg-primary_white p-2" key={order._id}>
              {order.state}
            </div>
          ))}
        </div>
        {/* {JSON.stringify(orders)} */}
      </AccountNavigation>
    </>
  );
};

export default MyOrders;
