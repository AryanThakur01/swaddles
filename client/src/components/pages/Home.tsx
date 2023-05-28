import { useState } from 'react';
import Navigation from '../UI/Navigation.tsx';
import Offer from '../cards/Product.tsx';

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      id: 1,
      image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Awesome Product by the great Supplier',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Hello world this is good',
    },
    {
      id: 3,
      image: 'https://plus.unsplash.com/premium_photo-1661767406044-f19b0f1e0a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Hello this is awesome, please check me out',
    },
  ];
  const offerProducts = [
    {
      id: 1, name: 'Pendant-1', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 2, name: 'Pendant-2', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 3, name: 'Pendant-3', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 4, name: 'Pendant-4', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 5, name: 'Pendant-5', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 6, name: 'Pendant-6', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 7, name: 'Pendant-7', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 8, name: 'Pendant-8', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 9, name: 'Pendant-9', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
  ];
  const BestSellers = [
    {
      id: 1, name: 'Best Pendant-A', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250,
    },
    {
      id: 2, name: 'Best Pendant-B', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 3, name: 'Best Pendant-C', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 4, name: 'Best Pendant-D', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250,
    },
    {
      id: 5, name: 'Best Pendant-E', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250, previousPrice: 500,
    },
    {
      id: 6, name: 'Best Pendant-F', image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80', description: 'A pendant preferred by many people with good taste and is rated well', price: 250,
    },
  ];

  const carouselNext = () => {
    if (activeIndex < carouselData.length - 1) setActiveIndex(activeIndex + 1);
    else setActiveIndex(0);
  };
  const carouselPrevious = () => {
    // console.log(activeIndex);
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
    else setActiveIndex(carouselData.length - 1);
  };

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

  return (
    <div className="m-auto">
      <Navigation />

      {/* CAROUSEL */}
      <div className="absolute w-[100vw] top-[25%] z-10 hidden md:flex justify-between">
        <button type="button" className="m-5 rounded-md bg-primary_white py-5 px-1 text-3xl" onClick={carouselPrevious}>{'<'}</button>
        <button type="button" className="m-5 rounded-md bg-primary_white py-5 px-1 text-3xl" onClick={carouselNext}>{'>'}</button>
      </div>
      <div>
        <div className="absolute top-0 left-0 w-full h-[70vh] min-h-[350px] overflow-y-hidden flex md:items-center">
          <div style={{ background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover` }} className="h-full w-full" />
          {/* <img src={carouselData[activeIndex].image} alt="!!" className="w-full" /> */}
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
        </div>
        <div className="relative z-0 w-[90%] md:w-[70%] m-auto min-h-[300px] h-[60vh] flex flex-col justify-end text-primary_white">
          <div className="my-5 text-xl">{carouselData[activeIndex].shortDescription}</div>
          <button className="border-2 border-secondary_white w-40 p-1 rounded-[4px]" type="button">VIEW PRODUCT</button>
        </div>
      </div>
      <div className="flex relative w-fit z-10 m-auto gap-2 items-center my-20">
        {carouselData.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label="slide"
            className={`w-6 ${activeIndex === i ? 'h-2' : 'h-3'} bg-secondary_dark`}
          />
        ))}
      </div>

      {/* OFFERS */}
      <div className="overflow-x-hidden py-4 px-[5%] md:px-[16%] m-auto">
        <div className="flex justify-between items-center">
          <div className="my-3 text-2xl font-semibold">OFFERS</div>
          <div className="hidden md:flex gap-3 h-fit">
            <button type="button" className="border-2 border-primary_white w-6 font-extrabold rounded-sm" onClick={() => scrollLeft('#offers', 400)}>{'<'}</button>
            <button type="button" className="border-2 border-primary_white px-2 font-bold rounded-sm">Show All</button>
            <button type="button" className="border-2 border-primary_white w-6 font-extrabold rounded-sm" onClick={() => scrollRight('#offers', 400)}>{'>'}</button>
          </div>
        </div>
        <div className="p-1 shadow-inner rounded-md">
          <div id="offers" className="w-full flex flex-col md:flex-row md:overflow-x-scroll scroll-smooth rounded-md">
            <div className="inline-flex flex-wrap justify-center md:flex-nowrap gap-5">
              {offerProducts.map((item) => (
                <Offer
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  previousPrice={item.previousPrice}
                  cardColor="primary_white"
                />
              ))}
            </div>
            <button type="button" className="self-center text-6xl bg-white rounded rotate-90 md:rotate-0">{'>'}</button>
          </div>
        </div>
      </div>

      {/* BEST SELLERS */}
      <div className="overflow-x-hidden my-12 px-[5%] md:px-[16%] m-auto">
        <div className="flex justify-between items-center">
          <div className="my-3 text-2xl font-semibold">BEST SELLERS</div>
          <div className="hidden md:flex gap-3 h-fit">
            <button type="button" className="border-2 border-primary_white w-6 font-extrabold rounded-sm" onClick={() => scrollLeft('#bestSellers', 400)}>{'<'}</button>
            <button type="button" className="border-2 border-primary_white px-2 font-bold rounded-sm">Show All</button>
            <button type="button" className="border-2 border-primary_white w-6 font-extrabold rounded-sm" onClick={() => scrollRight('#bestSellers', 400)}>{'>'}</button>
          </div>
        </div>
        <div className="p-1 shadow-inner rounded-md">
          <div id="bestSellers" className="w-full flex flex-col md:flex-row md:overflow-x-scroll scroll-smooth rounded-md">
            <div className="inline-flex flex-wrap justify-center md:flex-nowrap gap-5">
              {BestSellers.map((item) => (
                <Offer
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  previousPrice={item.previousPrice ? item.previousPrice : 0}
                  cardColor="primary_white"
                />
              ))}
            </div>
            <button type="button" className="self-center text-6xl bg-white rounded-md rotate-90 md:rotate-0">{'>'}</button>
          </div>
        </div>
      </div>

      {/* Carousel 02 */}
      <div className="flex justify-between relative top-[55vh]">
        <button type="button" className="m-5 rounded-md bg-primary_white py-5 px-1 text-3xl" onClick={() => scrollLeft('#topProducts')}>{'<'}</button>
        <button type="button" className="m-5 rounded-md bg-primary_white py-5 px-1 text-3xl" onClick={() => scrollRight('#topProducts')}>{'>'}</button>
      </div>
      <div id="topProducts" className="w-full flex overflow-x-hidden scroll-smooth rounded-md snap-x snap-mandatory">
        <div className="inline-flex justify-center flex-nowrap gap-5 h-[100vh]">
          <div style={{ background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover` }} className="h-full w-[100vw] snap-always snap-center" />
          <div style={{ background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover` }} className="h-full w-[100vw] snap-always snap-center" />
          <div style={{ background: `url(${carouselData[activeIndex].image}) no-repeat center center/cover` }} className="h-full w-[100vw] snap-always snap-center" />
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-0 px-[5%] md:px-[15%] m-auto bg-primary_white py-10">
        <div className="tracking-widest text-2xl my-5">SWADDLES</div>
        <div className="flex md:flex-row flex-col justify-between">
          <div>
            <h2>Company</h2>
            <ul className="text-tertiary_dark">
              <li><button type="button">Features</button></li>
              <li><button type="button">Affiliate Program</button></li>
            </ul>
          </div>
          <div>
            <h2>Support</h2>
            <ul className="text-tertiary_dark">
              <li><button type="button">Account</button></li>
              <li><button type="button">Contact Us</button></li>
              <li><button type="button">Customer Support</button></li>
            </ul>
          </div>
          <div>
            <h2>Legals</h2>
            <ul className="text-tertiary_dark">
              <li><button type="button">Terms & Conditions</button></li>
              <li><button type="button">Licensing</button></li>
              <li><button type="button">Privacy Policy</button></li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
