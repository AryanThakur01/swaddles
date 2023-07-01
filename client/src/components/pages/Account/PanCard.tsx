import { FC } from "react";
import Navigation from "../../UI/Navigation";
import AccountNavigation from "../../UI/ProfileNavigation";

const PanCard: FC = () => {
  return (
    <>
      <Navigation />
      <AccountNavigation activePage="panCard">Pancard</AccountNavigation>
    </>
  );
};

export default PanCard;
