import { FC, useEffect, useState } from "react";
import { FaHome, FaRegAddressBook, FaUserCircle } from "react-icons/fa";
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
    { page: "Home", link: "/", logo: <FaHome />, displayTo: "all" },
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
    console.log(search);
    // const products = await axios.get(
    //   `${
    //     import.meta.env.VITE_BACKEND
    //   }/api/v1/products/search?search=${search}&page=${1}&limit=${20}`
    // );
    // console.log(products);
    // navigate({
    //   pathname: "/productsDisplay",
    //   search: `?search=${search}`,
    // });
    navigate(`/productsDisplay?search=${search}`);
    window.location.reload();
  };

  return (
    <>
      <div
        id="nav"
        className="fixed z-40 top-0 md:top-3 w-full bg-secondary_white bg-opacity-90 backdrop-blur-3xl p-2 flex justify-between items-center text-xl md:mx-[15%] md:w-[70%] md:rounded-md"
      >
        {/* PROFILE */}
        {localStorage.getItem("token") ? (
          <Link
            className="text-4xl invert-[20%] hover:invert-[22%] font-extrabold"
            to="/account"
          >
            <FaUserCircle />
          </Link>
        ) : (
          <Link
            className="text-4xl invert-[20%] hover:invert-[22%] font-extrabold"
            to="/login"
          >
            <FaUserCircle />
          </Link>
        )}
        {/* LOGO */}
        {/* <div className="tracking-widest">SWADDLES</div> */}

        {isSearch ? (
          <div className="flex gap-0 rounded-sm overflow-hidden">
            <input
              type="text"
              name="product_search"
              id="product_search"
              className="outline-none bg-primary_white p-1 text-sm w-80"
              placeholder="Enter the product brand and more"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchProduct()}
            />
            <button className="bg-primary_white px-2" onClick={searchProduct}>
              <HiSearch />
            </button>
          </div>
        ) : (
          <div className="tracking-widest">SWADDLES</div>
        )}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <button
            type="button"
            className="text-2xl hover:invert-[15%]"
            onClick={() => setIsSearch(!isSearch)}
          >
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
          <div className="animate-[popup_0.5s_linear] fixed top-2 inset-x-0 z-50 min-h-[500px] md:h-[98%] md:w-[70%] m-auto bg-secondary_white md:rounded-md flex flex-col">
            <button
              type="button"
              className="w-9 self-end m-2 p-2 border-2 rounded-md bg-red-100"
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
