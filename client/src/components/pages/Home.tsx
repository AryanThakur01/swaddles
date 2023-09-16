import { FC, useEffect, useState } from "react";
import Navigation from "../UI/Navigation.tsx";
import Offer from "../cards/Product.tsx";
import Footer from "../UI/Footer.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { getHomePageData, getHomeProductsList } from "../../Api/Home.tsx";
import { IProducts } from "../../interfaces/interface.tsx";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Home: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [carousel, setCarousel] = useState<IProducts[]>();
  const [offers, setOffers] = useState<IProducts[]>();
  const [bestSellers, setBestSellers] = useState<IProducts[]>();

  const carouselData = [
    {
      id: 1,
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Error Loading",
      shortDescription: "Awesome Product by the great Supplier",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Error Loading",
      shortDescription: "Hello world this is good",
    },
    {
      id: 3,
      image:
        "https://plus.unsplash.com/premium_photo-1661767406044-f19b0f1e0a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      alt: "Error Loading",
      shortDescription: "Hello this is awesome, please check me out",
    },
  ];
  const offerProducts = [
    {
      id: 1,
      name: "Pendant-1",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 2,
      name: "Pendant-2",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 3,
      name: "Pendant-3",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 4,
      name: "Pendant-4",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 5,
      name: "Pendant-5",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 6,
      name: "Pendant-6",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 7,
      name: "Pendant-7",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 8,
      name: "Pendant-8",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 9,
      name: "Pendant-9",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
  ];
  const BestSellers = [
    {
      id: 1,
      name: "Best Pendant-A",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
    },
    {
      id: 2,
      name: "Best Pendant-B",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 3,
      name: "Best Pendant-C",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 4,
      name: "Best Pendant-D",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
    },
    {
      id: 5,
      name: "Best Pendant-E",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
      previousPrice: 500,
    },
    {
      id: 6,
      name: "Best Pendant-F",
      image:
        "https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
      description:
        "A pendant preferred by many people with good taste and is rated well",
      price: 250,
    },
  ];
  const scrollRight = (ElementId: string, scrollValue = 0) => {
    const element = document.querySelector(ElementId);
    const w = element?.clientWidth;

    if (element && scrollValue) element.scrollLeft += scrollValue;
    else if (element && w) element.scrollLeft += w + 100;
  };
  const scrollLeft = (ElementId: string, scrollValue = 0) => {
    const element = document.querySelector(ElementId);
    const w = element?.clientWidth;

    if (element && scrollValue) element.scrollLeft -= scrollValue;
    else if (element && w) element.scrollLeft -= w + 100;
  };

  const pagination = {
    clickable: true,
    renderBullet: (index: number, className: string) => {
      // return '<span class="' + className + '">' + (index + 1) + "</span>";
      return (
        '<span  class="' +
        className +
        ` bg-success p-2" value={${index}}></span>`
      );
    },
  };

  const homePageData = async () => {
    // Carousel Data
    const data = await getHomePageData();
    data.carouselData = data.carouselData.slice(0, 6);
    setCarousel([...data.carouselData]);

    // Display Products Data
    const products = await getHomeProductsList();
    const offers: IProducts[] = products.offers;
    const bestSellers: IProducts[] = products.bestSellers;
    setBestSellers(bestSellers);
    setOffers(offers);
  };

  const navigate = useNavigate();
  const showProduct = (_id: string) => {
    navigate(`/product?_id=${_id}`);
  };

  useEffect(() => {
    homePageData();
  }, []);

  return (
    <div className="m-auto">
      <Navigation />

      {/* CAROUSEL */}
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={pagination}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="md:my-0 my-11"
      >
        {carousel &&
          carousel.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="flex">
                <img
                  src={item.image[0]}
                  alt="NOT AVAILABLE"
                  className="absolute z-[-1] right-0 max-h-full self-center"
                />
                <div className="w-full h-[80vh] min-h-[500px] flex flex-col justify-center py-20 md:px-16 text-2xl px-4 gap-5 text-primary_white bg-black bg-opacity-50">
                  <p>{item.brand}</p>
                  <button
                    className="w-52 border border-secondary_white p-1 rounded font-bold"
                    onClick={() => showProduct(item._id)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* OFFERS */}
      <div className="overflow-x-hidden py-4 px-[5%] md:px-[16%] m-auto">
        <h2 className="my-3 text-2xl font-semibold">OFFERS</h2>
        <div className="p-1 shadow-inner rounded-md">
          <button
            type="button"
            className="w-10 h-10 justify-center items-center rounded-full bg-tertiary_dark text-white absolute my-44 left-[15%] hidden md:flex shadow-lg hover:scale-105"
            onClick={() => scrollLeft("#offers", 400)}
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="w-10 h-10 justify-center items-center rounded-full bg-tertiary_dark text-white absolute left-[82%] my-44 hidden md:flex shadow-lg hover:scale-105"
            onClick={() => scrollRight("#offers", 400)}
          >
            <FaChevronRight />
          </button>
          <div
            id="offers"
            className="w-full flex flex-col md:flex-row md:overflow-x-scroll scroll-smooth rounded-md no-scroll"
          >
            <div className="inline-flex flex-wrap justify-center md:flex-nowrap gap-5">
              {offers &&
                offers.map((item) => (
                  <Offer
                    key={item._id}
                    id={item._id}
                    name={item.product_name}
                    image={item.image[0]}
                    description={item.description}
                    price={item.discounted_price}
                    previousPrice={item.retail_price}
                    cardColor="primary_white"
                  />
                ))}
            </div>
            {/* <button */}
            {/*   type="button" */}
            {/*   className="self-center text-6xl bg-white rounded rotate-90 md:rotate-0" */}
            {/* > */}
            {/*   {">"} */}
            {/* </button> */}
          </div>
        </div>
      </div>

      {/* BEST SELLERS */}
      <div className="overflow-x-hidden my-12 px-[5%] md:px-[16%] m-auto">
        <h2 className="my-3 text-2xl font-semibold">BEST SELLERS</h2>
        <div className="p-1 shadow-inner rounded-md">
          <button
            type="button"
            className="w-10 h-10 justify-center items-center rounded-full bg-tertiary_dark text-white absolute my-44 left-[15%] hidden md:flex shadow-lg hover:scale-105"
            onClick={() => scrollLeft("#bestSellers", 400)}
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            className="w-10 h-10 justify-center items-center rounded-full bg-tertiary_dark text-white absolute left-[82%] my-44 hidden md:flex shadow-lg hover:scale-105"
            onClick={() => scrollRight("#bestSellers", 400)}
          >
            <FaChevronRight />
          </button>

          <div
            id="bestSellers"
            className="w-full flex flex-col md:flex-row md:overflow-x-scroll scroll-smooth rounded-md no-scroll"
          >
            <div className="inline-flex flex-wrap justify-center md:flex-nowrap gap-5">
              {bestSellers &&
                bestSellers.map((item) => (
                  <Offer
                    key={item._id}
                    id={item._id}
                    name={item.product_name}
                    image={item.image[0]}
                    description={item.description}
                    price={item.discounted_price}
                    previousPrice={item.retail_price ? item.retail_price : 0}
                    cardColor="primary_white"
                  />
                ))}
            </div>
            {/* <button */}
            {/*   type="button" */}
            {/*   className="self-center text-6xl bg-white rounded-md rotate-90 md:rotate-0" */}
            {/* > */}
            {/*   {">"} */}
            {/* </button> */}
          </div>
        </div>
      </div>

      {/* Carousel 02 */}
      {/* <div className="flex justify-between relative top-[55vh]"> */}
      {/*   <button */}
      {/*     type="button" */}
      {/*     className="m-5 rounded-md py-5 px-1 text-3xl" */}
      {/*     onClick={() => scrollLeft("#topProducts")} */}
      {/*   > */}
      {/*     {"<"} */}
      {/*   </button> */}
      {/*   <button */}
      {/*     type="button" */}
      {/*     className="m-5 rounded-md py-5 px-1 text-3xl" */}
      {/*     onClick={() => scrollRight("#topProducts")} */}
      {/*   > */}
      {/*     {">"} */}
      {/*   </button> */}
      {/* </div> */}
      {/* <div */}
      {/*   id="topProducts" */}
      {/*   className="w-full flex overflow-x-hidden scroll-smooth rounded-md snap-x snap-mandatory" */}
      {/* > */}
      {/*   <div className="inline-flex justify-center flex-nowrap gap-5 h-[100vh]"> */}
      {/*     <div */}
      {/*       style={{ */}
      {/*         background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover`, */}
      {/*       }} */}
      {/*       className="h-full w-[100vw] snap-always snap-center" */}
      {/*     /> */}
      {/*     <div */}
      {/*       style={{ */}
      {/*         background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover`, */}
      {/*       }} */}
      {/*       className="h-full w-[100vw] snap-always snap-center" */}
      {/*     /> */}
      {/*     <div */}
      {/*       style={{ */}
      {/*         background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover`, */}
      {/*       }} */}
      {/*       className="h-full w-[100vw] snap-always snap-center" */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
      <Footer />
    </div>
  );
};

export default Home;
