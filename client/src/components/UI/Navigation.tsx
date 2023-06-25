import { useState } from "react";
import { FaHome, FaInfo, FaRegAddressBook, FaUserCircle } from "react-icons/fa";
import { HiMenuAlt4, HiSearch, HiShoppingCart } from "react-icons/hi";
import { GrClose, GrLogin } from "react-icons/gr";
import { Link } from "react-router-dom";

function Navigation() {
  const [menu, setMenu] = useState(0);

  const navigationList = [
    { page: "Home", link: "/", logo: <FaHome /> },
    { page: "About", link: "/about", logo: <FaInfo /> },
    { page: "Cart", link: "/cart", logo: <HiShoppingCart /> },
    { page: "Login", link: "/login", logo: <GrLogin />, special: true },
    {
      page: "Signup",
      link: "/signup",
      logo: <FaRegAddressBook />,
      special: true,
    },
  ];

  return (
    <>
      <div className=" fixed z-40 top-0 md:top-3 w-full bg-secondary_white bg-opacity-90 backdrop-blur-3xl p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md">
        {/* PROFILE */}
        <button
          type="button"
          className="text-4xl invert-[20%] hover:invert-[22%] font-extrabold"
        >
          <FaUserCircle />
        </button>

        {/* LOGO */}
        <div className="tracking-widest">SWADDLES</div>
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <button type="button" className="text-2xl hover:invert-[15%]">
            {/* <img src={Assets.search} alt="AT" className="h-8 p-1" /> */}
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
          <div className="animate-[popup_0.5s_linear] fixed inset-0 z-50 min-h-[500px] md:h-[98%] md:w-[70%] m-auto bg-secondary_white md:rounded-md flex flex-col">
            <button
              type="button"
              className="w-9 self-end m-2 p-2 border-2 rounded-md bg-red-100"
              onClick={() => setMenu(0)}
            >
              <GrClose />
            </button>
            <div className="flex flex-col gap-2 mx-auto justify-between h-full text-2xl my-10">
              <div className="flex flex-col">
                {navigationList.map((item) => (
                  <div key={item.page}>
                    {!item.special && (
                      <Link
                        to={item.link}
                        type="button"
                        className="flex items-center gap-2 hover:invert-[20%] text-left p-1 my-2 rounded-sm w-52"
                      >
                        {item.logo} {item.page}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                {navigationList.map((item) => (
                  <div key={item.page}>
                    {item.special && (
                      <Link
                        to={item.link}
                        type="button"
                        className="flex items-center gap-2 hover:invert-[10%] text-left p-1 my-2 rounded-sm w-52 bg-tertiary_white"
                      >
                        {item.logo} {item.page}
                      </Link>
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
}

export default Navigation;
