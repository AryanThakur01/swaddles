import { FC } from "react";
import Navigation from "../../UI/Navigation";
import AccountNavigation from "../../UI/ProfileNavigation";

const Account: FC = () => {
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="account">
        <div className="flex justify-center items-center w-full h-full">
          Welcome Aryan Thakur, How may we help you?
        </div>
      </AccountNavigation>
    </>
  );
};

export default Account;
