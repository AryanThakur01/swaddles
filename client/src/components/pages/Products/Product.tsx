import { FC, useEffect, useState } from "react";
import Navigation from "../../UI/Navigation";
import { getProductData } from "../../../context/ProductProvider";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../../node_modules/swiper/swiper.css";
import { Autoplay, Pagination } from "swiper/modules";
import "../../../../node_modules/swiper/modules/pagination.css";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { getSingleProductApi } from "../../../Api/Products";

interface IProduct {}

const Product: FC<IProduct> = () => {
  const [showCompleteData, setShowCompleteData] = useState("");
  const CurrentProduct = getProductData();
  // const navigate = useNavigate();

  const getProduct = async () => {
    const _id = new URLSearchParams(location.search).get("_id");
    try {
      let data = await getSingleProductApi(_id);
      // ------ Converting Items According to the need ------------
      const image = data.image;
      let categories = data.product_category_tree;
      let specs: string = data.product_specifications;
      data.product_category_tree = categories
        .substring(2, categories.length - 2)
        .split(" >> ");
      specs = specs
        .substring(specs.indexOf("[") + 1, specs.indexOf("]"))
        .replaceAll('"=>"', '":"')
        .replaceAll("}, {", "}-^-{");
      let specList = specs.split("-^-");
      specList.forEach((spec, i) => (specList[i] = JSON.parse(spec)));
      data.image = image.substring(2, image.length - 2).split('", "');
      data.product_specifications = specList;
      // -----------------------------------------------------------

      if (CurrentProduct?.setProduct) CurrentProduct.setProduct(data);
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

  // const ReadMore = () => {
  //   if (CurrentProduct?.product_specifications) {
  //     const navLink = `/product/productspecs?product_specifications=${CurrentProduct.product_specifications.toString()}`;
  //     navigate(navLink);
  //   }
  // };

  return (
    <div>
      <Navigation />
      <div className="my-20 p-4 w-[80%] m-auto flex md:flex-row flex-col gap-5 bg-white rounded-sm shadow-lg">
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
                <button className="bg-success p-2 text-center flex justify-center items-center gap-2">
                  <FaShoppingBag /> Buy
                </button>
                <button className="bg-primary p-2 text-center flex justify-center items-center gap-2">
                  <FaShoppingCart />
                  Cart
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
                {showCompleteData !== "description" && (
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
                    <button className="text-primary  w-fit m-auto">
                      ReadMore
                    </button>
                  )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Product;
