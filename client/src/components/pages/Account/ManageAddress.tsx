import { FC } from "react";
import AccountNavigation from "../../UI/ProfileNavigation";
import Navigation from "../../UI/Navigation";

const ManageAddress: FC = () => {
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="manageAddress">
        ManageAddress
      </AccountNavigation>
    </>
  );
};

export default ManageAddress;
