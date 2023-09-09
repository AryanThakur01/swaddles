import axios from "axios";
import { ICheckout } from "../interfaces/interface";

export interface ICheckoutData {
  username: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
}

export const Checkout = async (order: ICheckout[], values: ICheckoutData) => {
  const authHeader = "Bearer " + localStorage.getItem("token");
  const { data } = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/checkout/`,
    data: { order, values },
    headers: {
      Authorization: authHeader,
    },
  });
  return data;
};

export const saveOrder = async (
  shippingData: ICheckoutData,
  razorpayRes: any,
  order: ICheckout[],
) => {
  const authHeader = "Bearer " + localStorage.getItem("token");
  const { data } = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/checkout/save`,
    data: { shippingData, razorpayRes, order },
    headers: {
      Authorization: authHeader,
    },
  });
  console.log(data);
  // console.log(shippingData);
  // console.log(razorpayRes);
  // console.log(order);
  // return data;
};
