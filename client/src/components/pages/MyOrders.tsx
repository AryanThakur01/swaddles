import { FC } from "react";
import AccountNavigation from "../UI/ProfileNavigation";
import Navigation from "../UI/Navigation";

const MyOrders: FC = () => {
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="myOrders">My Orders</AccountNavigation>
    </>
  );
};

export default MyOrders;
