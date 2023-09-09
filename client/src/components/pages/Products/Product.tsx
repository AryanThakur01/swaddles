import { FC, useEffect, useState } from "react";
import Navigation from "../../UI/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";
import { Autoplay, Pagination } from "swiper/modules";
import "../../../../node_modules/swiper/modules/pagination.css";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { getSingleProductApi } from "../../../Api/Products";
import { useNavigate } from "react-router-dom";
import Footer from "../../UI/Footer";
import { IProducts } from "../../../interfaces/interface";
import { addToCartApi } from "../../../Api/Cart";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProduct {}

const Product: FC<IProduct> = () => {
  const [showCompleteData, setShowCompleteData] = useState("");
  const [CurrentProduct, setCurrentProduct] = useState<IProducts | undefined>();
  // const CurrentProduct = getProductData();

  const navigate = useNavigate();
  const getProduct = async () => {
    const _id = new URLSearchParams(location.search).get("_id");
    try {
      let data = await getSingleProductApi(_id);
      setCurrentProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      // return '<span class="' + className + '">' + (index + 1) + "</span>";
      return '<span  class="' + className + ` p-2" value={${index}}></span>`;
    },
  };

  useEffect(() => {
    getProduct();
  }, []);

  const ReadMore = () => {
    if (CurrentProduct) {
      const navLink = `/product/productspecs?_id=${CurrentProduct._id}`;
      navigate(navLink);
    }
  };

  const addProductToCart = () => {
    try {
      const item = new URLSearchParams(location.search).get("_id");
      const quantity = 1;
      if (item) addToCartApi(item, quantity);
      toast.success("Item Added Successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "product-added",
      });
    } catch (error) {
      toast.error("Something Went Wrong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        toastId: "product-added",
      });
    }
  };

  const purchaseHandler = async () => {
    const _id = new URLSearchParams(location.search).get("_id");
    let checkoutData: string | string[] = [];
    let productData = { order: _id, qty: 1 };
    checkoutData.push(JSON.stringify(productData));
    checkoutData = JSON.stringify(checkoutData);
    navigate("/checkout?search=" + checkoutData);
  };

  return (
    <div>
      <Navigation />
      <ToastContainer transition={Slide} />
      <div className="my-20 p-4 md:w-[80%] m-auto flex md:flex-row flex-col gap-5 bg-white rounded-sm shadow-lg">
        {CurrentProduct ? (
          <>
            <div className="md:max-w-[40%] border-2">
              {/* {CurrentProduct.image.map((pImage) => (
                <img src={pImage} alt="" />
              ))} */}
              <Swiper
                spaceBetween={50}
                modules={[Pagination, Autoplay]}
                pagination={pagination}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {CurrentProduct.image.map((pImage, i) => (
                  <SwiperSlide key={pImage} virtualIndex={i}>
                    <img
                      src={pImage}
                      alt="Image Unavailable"
                      className="max-h-[60vh] mx-auto my-8"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="grid grid-cols-2 font-bold text-primary_white md:sticky fixed w-full bottom-0 left-0 z-30">
                <button
                  className="bg-success p-2 text-center flex justify-center items-center gap-2"
                  onClick={purchaseHandler}
                >
                  <FaShoppingBag /> Buy
                </button>
                <button
                  className="bg-primary p-2 text-center flex justify-center items-center gap-2"
                  onClick={addProductToCart}
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-primary_dark">
                {CurrentProduct.product_name}
              </h2>
              <p className="text-secondary_dark">
                {showCompleteData === "description"
                  ? CurrentProduct.description
                  : CurrentProduct.description.substring(0, 300)}
                {CurrentProduct.description.length >= 300 &&
                  showCompleteData !== "description" && (
                    <button
                      className="text-primary"
                      onClick={() => setShowCompleteData("description")}
                    >
                      ...Read More
                    </button>
                  )}
              </p>
              <div className="flex gap-3 text-secondary_dark">
                <p className="font-bold text-3xl">
                  ₹{CurrentProduct?.discounted_price}
                </p>
                <p className="line-through">₹{CurrentProduct.retail_price}</p>
              </div>
              <hr />
              <div className="p-3 flex gap-2 flex-col rounded-md shadow-xl border text-secondary_dark">
                <h2 className="font-bold text-lg">Specifications</h2>
                <hr />
                {typeof CurrentProduct.product_specifications === "object" &&
                  CurrentProduct.product_specifications
                    .slice(0, 5)
                    .map((item) => (
                      <div
                        className="flex justify-between gap-10"
                        key={item.key || item.value}
                      >
                        <h3>{item.key ? item.key : "----------"}</h3>
                        <p>{item.value}</p>
                      </div>
                    ))}
                {CurrentProduct.product_specifications &&
                  CurrentProduct.product_specifications?.length > 5 && (
                    // <Link
                    //   to={`/product/productspecs?_id=${CurrentProduct.product_specifications.toString()}`}
                    //   className="text-primary text-center"
                    // >
                    //   Read More
                    // </Link>
                    <button
                      className="text-primary  w-fit m-auto"
                      onClick={ReadMore}
                    >
                      Read More
                    </button>
                  )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Product;
