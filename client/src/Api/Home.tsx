import axios from "axios";
import { IProducts } from "../interfaces/interface";

export const getHomePageData = async () => {
  const { data } = await axios({
    method: "get",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/suggested`,
  });

  for (let i = 0; i < data.carouselData.length; i++) {
    const item = data.carouselData[i];
    data.carouselData[i].image = item.image
      .substring(2, item.image.length - 2)
      .split('", "');
  }

  const carouselData: IProducts[] = data.carouselData;

  return { carouselData };
};

export const getHomeProductsList = async () => {
  const { data } = await axios({
    method: "get",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/products/gethomeproducts`,
  });
  for (let i = 0; i < data.offers.length; i++) {
    const item = data.offers[i];
    data.offers[i].image = item.image
      .substring(2, item.image.length - 2)
      .split('", "');
  }
  for (let i = 0; i < data.bestSellers.length; i++) {
    const item = data.bestSellers[i];
    data.bestSellers[i].image = item.image
      .substring(2, item.image.length - 2)
      .split('", "');
  }
  return data;
};
