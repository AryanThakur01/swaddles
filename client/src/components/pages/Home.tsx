import { useState } from 'react';
import Navigation from '../UI/Navigation.tsx';

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselData = [
    {
      image: 'https://plus.unsplash.com/premium_photo-1670426501357-23bbaaab1e3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Awesome Product by the great Supplier',
    },
    {
      image: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Hello world this is good',
    },
    {
      image: 'https://plus.unsplash.com/premium_photo-1661767406044-f19b0f1e0a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
      alt: 'Error Loading',
      shortDescription: 'Hello this is awesome, please check me out',
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

  return (
    <div className="m-auto">
      <Navigation />
      <div className="absolute w-[100vw] top-[25%] z-10 hidden md:flex justify-between">
        <button type="button" className="m-5 rounded-full bg-primary_white p-2 text-3xl" onClick={carouselPrevious}>{'<'}</button>
        <button type="button" className="m-5 rounded-full bg-primary_white p-2 text-3xl" onClick={carouselNext}>{'>'}</button>
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
          <button type="button" onClick={() => setActiveIndex(i)} aria-label="slide" className={`w-6 ${activeIndex === i ? 'h-2' : 'h-3'} bg-secondary_dark`} />
        ))}
      </div>
    </div>
  );
}

export default Home;
