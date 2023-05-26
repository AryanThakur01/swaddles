import { useState } from 'react';
import Navigation from '../UI/Navigation.tsx';
import Offer from '../cards/Offer.tsx';

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

  const scrollRight = () => {
    const offers = document.querySelector('#offers');
    if (offers) offers.scrollLeft += 300;
  };
  const scrollLeft = () => {
    const offers = document.querySelector('#offers');
    if (offers) offers.scrollLeft -= 300;
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
      <div className="overflow-x-hidden py-4 px-[5%] md:px-[16%] m-auto bg-primary_white">
        <div className="flex justify-between items-center">
          <div className="my-3 text-2xl font-semibold">OFFERS</div>
          <div className="hidden md:flex gap-3 h-fit">
            <button type="button" className="py-1 bg-white w-6 font-extrabold rounded-sm" onClick={scrollLeft}>{'<'}</button>
            <button type="button" className="py-1 bg-white px-2 font-bold rounded-sm" onClick={scrollLeft}>Show All</button>
            <button type="button" className="py-1 bg-white w-6 font-extrabold rounded-sm" onClick={scrollRight}>{'>'}</button>
          </div>
        </div>
        <div className="p-1 shadow-inner rounded-md">
          <div id="offers" className="w-full flex-wrap md:overflow-x-scroll scroll-smooth rounded-md">
            <div className="inline-flex flex-wrap justify-center md:flex-nowrap gap-3">
              {offerProducts.map((item) => (
                <Offer
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  price={item.price}
                  previousPrice={item.previousPrice}
                />
              ))}
              <button type="button" className="self-center text-8xl bg-white rounded-md py-2">{'>'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
