import { FC, useState } from "react";
import {
  FaArrowLeft,
  FaBriefcase,
  FaChevronRight,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { IAccountNavigation } from "../../interfaces/interface";
import { HiMenuAlt4 } from "react-icons/hi";

const AccountNavigation: FC<IAccountNavigation> = ({
  children,
  activePage,
}) => {
  const [accNavMenu, setAccNavMenu] = useState(false);

  let user = JSON.parse(localStorage.getItem("user") || "");
  return (
    <div
      className={`flex gap-3 p-2 mt-20 ${accNavMenu ? "bg-white" : "bg-none"}`}
    >
      <div
        className={`w-[25%] md:flex flex-col gap-3 ${
          accNavMenu
            ? "absolute bg-white w-full h-full inset-0 top-20 animate-popup"
            : "hidden"
        }`}
      >
        <button
          className="md:hidden m-3 bg-primary_white"
          onClick={() => setAccNavMenu(!accNavMenu)}
        >
          <FaArrowLeft />
        </button>
        <div className="gap-3 h-20 bg-white shadow-sm rounded-sm flex items-center p-2">
          <div className="text-4xl text-secondary_dark">
            <FaUserCircle />
          </div>
          <div>
            <p className="text-sm">Hello,</p>
            <h1 className="font-bold text-md">
              {user.firstname} {user.lastname}
            </h1>
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
            </div>
            <hr />
          </div>
        </div>
      </div>
      <div className="w-full p-3 bg-white shadow-sm min-h-full rounded-sm">
        <div className="w-full flex justify-end bg-primary_white p-3 rounded md:hidden">
          <button type="button" onClick={() => setAccNavMenu(!accNavMenu)}>
            <HiMenuAlt4 />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AccountNavigation;
