import { FC, useEffect, useState } from "react";
import { FaHome, FaRegAddressBook, FaUser } from "react-icons/fa";
import { HiMenuAlt4, HiSearch, HiShoppingCart } from "react-icons/hi";
import { GrClose, GrLogin, GrLogout } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { INavigationCategory } from "../../interfaces/interface";
import axios from "axios";

const Navigation: FC = () => {
  const [menu, setMenu] = useState(0);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState("");

  const navigationList: Array<INavigationCategory> = [
    {
      page: "Profile",
      link: `${localStorage.getItem("token") ? "/account" : "/login"}`,
      logo: <FaUser />,
      displayTo: "all",
    },
    {
      page: "Cart",
      link: "/cart",
      logo: <HiShoppingCart />,
      displayTo: "logged",
    },
    {
      page: "Login",
      link: "/login",
      logo: <GrLogin />,
      special: true,
      displayTo: "not-logged",
    },
    {
      page: "Signup",
      link: "/signup",
      logo: <FaRegAddressBook />,
      special: true,
      displayTo: "not-logged",
    },
    {
      page: "Logout",
      link: "/",
      logo: <GrLogout />,
      special: true,
      displayTo: "logged",
      function: () => {
        localStorage.removeItem("token");
      },
    },
  ];

  useEffect(() => {
    const documentBody = document.body.style;
    if (menu) documentBody.overflowY = "hidden";
    else documentBody.overflowY = "scroll";
  }, [menu]);
  const navigate = useNavigate();

  const searchProduct = async () => {
    if (!search.trim()) {
      return;
    } else {
      navigate(`/productsDisplay?search=${search}`);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        id="nav"
        className="fixed z-40 top-0 md:top-3 w-full bg-secondary_white bg-opacity-90 backdrop-blur-3xl p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md overflow-hidden"
      >
        {/* PROFILE */}
        {/* {localStorage.getItem("token") ? ( */}
        {/*   <Link */}
        {/*     className="text-4xl invert-[20%] hover:invert-[22%] font-extrabold" */}
        {/*     to="/account" */}
        {/*   > */}
        {/*     <FaUserCircle /> */}
        {/*   </Link> */}
        {/* ) : ( */}
        {/*   <Link */}
        {/*     className="text-4xl invert-[20%] hover:invert-[22%] font-extrabold" */}
        {/*     to="/login" */}
        {/*   > */}
        {/*     <FaUserCircle /> */}
        {/*   </Link> */}
        {/* )} */}
        {/* LOGO */}
        <Link className="tracking-wide hover:tracking-wider" to="/">
          SWADDLES
        </Link>

        <div className="flex items-center gap-3">
          {/* className="fixed z-40 top-0 md:top-3 w-full bg-secondary_white bg-opacity-90 backdrop-blur-3xl p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md" */}
          <div
            className={`fixed right-0 h-full bg-secondary_white p-1 z-50 flex justify-center w-full md:gap-5 ${
              isSearch ? "animate-movein_right" : "hidden"
            }`}
          >
            <button className="px-2 rounded" onClick={searchProduct}>
              <HiSearch />
            </button>
            <input
              type="text"
              name="product_search"
              id="product_search"
              className="outline-none text-black placeholder:text-tertiary_dark bg-secondary_white p-2 text-sm w-full"
              placeholder="Enter the product brand and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProduct()}
            />
            <button
              className="px-2 text-lg rounded"
              onClick={() => setIsSearch(!isSearch)}
            >
              <GrClose />
            </button>
          </div>
          {/* SEARCH */}
          <button
            type="button"
            className="text-2xl hover:invert-[15%]"
            onClick={() => {
              setIsSearch(!isSearch);
              document.getElementById("product_search");
            }}
          >
            <HiSearch />
          </button>

          {/* HAMBURGER */}
          <button
            type="button"
            className="text-3xl hover:invert-[20%]"
            onClick={() => setMenu(1)}
          >
            <HiMenuAlt4 />
          </button>
        </div>
      </div>

      {/* NAVIGATION MENU */}
      {menu ? (
        <>
          <div className="fixed inset-0 z-50 h-full w-full bg-black bg-opacity-60 text-secondary_dark backdrop-blur-sm" />
          <div className="animate-popup fixed top-2 inset-x-0 z-50 min-h-[500px] md:h-[98%] md:w-[70%] m-auto bg-secondary_white md:rounded-md flex flex-col">
            <button
              type="button"
              className="w-9 self-end m-2 p-2 hover:scale-105"
              onClick={() => setMenu(0)}
            >
              <GrClose />
            </button>
            <div className="flex flex-col gap-2 mx-auto justify-between h-full text-2xl my-10">
              <div className="flex flex-col">
                {navigationList.map((item: INavigationCategory) => (
                  <div key={item.page}>
                    {!item.special &&
                    (item.displayTo === "all" ||
                      (item.displayTo === "logged" &&
                        localStorage.getItem("token")) ||
                      (item.displayTo === "not-logged" &&
                        !localStorage.getItem("token"))) ? (
                      <>
                        <Link
                          to={item.link}
                          type="button"
                          className="flex items-center gap-2 hover:invert-[20%] text-left p-1 my-2 rounded-sm w-52"
                        >
                          {item.logo} {item.page}
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {navigationList.map((item: INavigationCategory) => (
                  <div key={item.page}>
                    {item.special &&
                    (item.displayTo === "all" ||
                      (item.displayTo === "logged" &&
                        localStorage.getItem("token")) ||
                      (item.displayTo === "not-logged" &&
                        !localStorage.getItem("token"))) ? (
                      <>
                        <Link
                          to={item.link}
                          type="button"
                          className="flex items-center gap-2 hover:invert-[10%] text-left p-1 my-2 rounded-sm w-52 bg-tertiary_white"
                          onClick={() => {
                            item.function && item.function();
                            setMenu(0);
                          }}
                        >
                          {item.logo} {item.page}
                        </Link>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Navigation;
