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
  console.log(carouselData);

  return { carouselData };
};
