import { FC, useEffect, useState } from "react";
import Navigation from "../UI/Navigation.tsx";
import Offer from "../cards/Product.tsx";
import Footer from "../UI/Footer.tsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Pagination } from "swiper/modules";
import { getHomePageData, getHomeProductsList } from "../../Api/Home.tsx";
import { IProducts } from "../../interfaces/interface.tsx";
import { useNavigate } from "react-router-dom";

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
      {/* <div className="absolute w-[100vw] top-[25%] z-10 hidden md:flex justify-between">
        <button
          type="button"
          className="m-5 rounded-md py-5 px-1 text-3xl"
          onClick={carouselPrevious}
        >
          {"<"}
        </button>
        <button
          type="button"
          className="m-5 rounded-md py-5 px-1 text-3xl"
          onClick={carouselNext}
        >
          {">"}
        </button>
      </div> */}
      {/* <div>
        <div classname="absolute top-0 left-0 w-full h-[70vh] min-h-[350px] overflow-y-hidden flex md:items-center">
          <div
            style={{
              background: `url(${carouseldata[activeindex].image}) no-repeat center center/cover`,
            }}
            classname="h-full w-full"
          />
          <div classname="absolute top-0 left-0 w-full h-full bg-primary_dark opacity-50" />
        </div>
        <div classname="relative z-0 w-[90%] md:w-[70%] m-auto min-h-[300px] h-[60vh] flex flex-col justify-end text-primary_white">
          <div classname="my-5 text-xl">
            {carouseldata[activeindex].shortdescription}
          </div>
          <button
            classname="border-2 border-secondary_white w-40 p-1 rounded-[4px]"
            type="button"
          >
            view product
          </button>
        </div>
      </div> */}
      {/* <div className="flex relative w-fit z-10 m-auto gap-2 items-center my-20">
        {carouselData.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label="slide"
            className={`w-6 ${
              activeIndex === i ? "h-2" : "h-3"
            } bg-secondary_dark`}
          />
        ))}
      </div> */}

      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={pagination}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {carousel &&
          carousel.map((item) => (
            <SwiperSlide key={item._id}>
              <div
              // style={{
              //   background: `url(${item.image[0]}) no-repeat bottom/cover`,
              // }}
              >
                <img
                  src={item.image[0]}
                  alt="NOT AVAILABLE"
                  className="absolute z-[-1] h-full right-0"
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
        <div className="flex justify-between items-center">
          <div className="my-3 text-2xl font-semibold">OFFERS</div>
          <div className="hidden md:flex gap-3 h-fit">
            <button
              type="button"
              className="border-2 border-primary_white w-6 font-extrabold rounded-sm"
              onClick={() => scrollLeft("#offers", 400)}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="border-2 border-primary_white px-2 font-bold rounded-sm"
            >
              Show All
            </button>
            <button
              type="button"
              className="border-2 border-primary_white w-6 font-extrabold rounded-sm"
              onClick={() => scrollRight("#offers", 400)}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="p-1 shadow-inner rounded-md">
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
        <div className="flex justify-between items-center">
          <div className="my-3 text-2xl font-semibold">BEST SELLERS</div>
          <div className="hidden md:flex gap-3 h-fit">
            <button
              type="button"
              className="border-2 border-primary_white w-6 font-extrabold rounded-sm"
              onClick={() => scrollLeft("#bestSellers", 400)}
            >
              {"<"}
            </button>
            <button
              type="button"
              className="border-2 border-primary_white px-2 font-bold rounded-sm"
            >
              Show All
            </button>
            <button
              type="button"
              className="border-2 border-primary_white w-6 font-extrabold rounded-sm"
              onClick={() => scrollRight("#bestSellers", 400)}
            >
              {">"}
            </button>
          </div>
        </div>
        <div className="p-1 shadow-inner rounded-md">
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
