import { FC, useEffect } from "react";
import Navigation from "../../UI/Navigation";
import AccountNavigation from "../../UI/ProfileNavigation";

const Account: FC = () => {
  let user = JSON.parse(localStorage.getItem("user") || "");
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="account">
        <div className="flex justify-center items-center w-full h-[70vh]">
          Welcome {user.firstname} {user.lastname}, How may we help you?
        </div>
      </AccountNavigation>
    </>
  );
};

export default Account;
