import axios from "axios";

export const addToCartApi = async (item: string, quantity: number) => {
  const authHeader = "Bearer " + localStorage.getItem("token");
  const { data } = await axios({
    method: "post",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/cart/addtocart`,
    data: {
      item,
      quantity,
    },
    headers: {
      Authorization: authHeader,
    },
  });
  return data;
};

export const removeFromCartApi = async (item: string) => {
  const authHeader = "Bearer " + localStorage.getItem("token");
  const { data } = await axios({
    method: "delete",
    url: `${
      import.meta.env.VITE_BACKEND
    }/api/v1/cart/removefromcart?_id=${item}`,
    headers: {
      Authorization: authHeader,
    },
  });
  return data;
};

export const getCartApi = async () => {
  const authHeader = "Bearer " + localStorage.getItem("token");

  const { data } = await axios({
    method: "get",
    url: `${import.meta.env.VITE_BACKEND}/api/v1/cart/getcart`,
    headers: {
      Authorization: authHeader,
    },
  });

  // ------ Converting Data For The Application ------------
  for (let i = 0; i < data.length; i++) {
    let item = data[i].item;
    const image = item.image;
    item.image = image.substring(2, image.length - 2).split('", "');
    // item.product_specifications = specList;
  }
  // -----------------------------------------------------------

  return data;
};
