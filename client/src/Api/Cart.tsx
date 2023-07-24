import axios from "axios";
import { ICart } from "../interfaces/interface";

export const AddToCartApi = async ({ item, quantity }: ICart) => {
  const { data } = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/cart/addtocart`,
    data: {
      item,
      quantity,
    },
  });
  return data;
};

export const getCartApi = async () => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/v1/cart/getcart`
  );
  console.log(data);
  return data;
};
