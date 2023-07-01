import { FC } from "react";
import {
  FaBriefcase,
  FaChevronRight,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IAccountNavigation } from "../../interfaces/interface";

const AccountNavigation: FC<IAccountNavigation> = ({
  children,
  activePage,
}) => {
  return (
    <div className="flex gap-3 p-2 mt-20">
      <div className="w-[25%] flex flex-col gap-3">
        <div className="gap-3 h-20 bg-white shadow-sm rounded-sm flex items-center p-2">
          <div className="text-4xl text-secondary_dark">
            <FaUserCircle />
          </div>
          <div>
            <p className="text-sm">Hello,</p>
            <h1 className="font-bold text-md">Aryan Thakur</h1>
          </div>
        </div>
        <div className="bg-white shadow-sm min-w-[25%] h-full rounded-sm">
          <Link
            to="/account/myorders"
            className="flex items-center text-tertiary_dark p-2 gap-2 justify-between"
          >
            <div className="flex items-center gap-2 text-lg">
              <FaBriefcase />
              <h2>MY ORDERS</h2>
            </div>
            <FaChevronRight />
          </Link>
          <hr />
          <div className="my-4">
            <div className="flex items-center text-tertiary_dark p-2 gap-2">
              <FaUser />
              <h2>ACCOUNT SETTINGS</h2>
            </div>
            <div className="ml-7 flex flex-col gap-1">
              <Link
                to="/account/personal"
                className={`p-2 ${
                  activePage === "personal" && "bg-primary_white text-primary"
                } hover:bg-primary_white hover:text-primary`}
              >
                Profile Information
              </Link>
              <Link
                to="/account/address"
                className={`p-2 ${
                  activePage === "manageAddress" &&
                  "bg-primary_white text-primary"
                } hover:bg-primary_white hover:text-primary`}
              >
                Manage Address
              </Link>
              <Link
                to="/account/pancard"
                className={`p-2 ${
                  activePage === "panCard" && "bg-primary_white text-primary"
                } hover:bg-primary_white hover:text-primary`}
              >
                PAN Card Information
              </Link>
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="w-full p-3 bg-white shadow-sm min-h-full rounded-sm">
        {children}
      </div>
    </div>
  );
};

export default AccountNavigation;
