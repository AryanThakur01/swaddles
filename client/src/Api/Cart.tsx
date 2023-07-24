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
  console.log(data._doc);
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
    // let categories = item.product_category_tree;
    // let specs: string = item.product_specifications;
    // item.product_category_tree = categories
    //   .substring(2, categories.length - 2)
    //   .split(" >> ");
    // specs = specs
    //   .substring(specs.indexOf("[") + 1, specs.indexOf("]"))
    //   .replaceAll('"=>"', '":"')
    //   .replaceAll("}, {", "}-^-{");
    // let specList = specs.split("-^-");
    // specList.forEach((spec, i) => (specList[i] = JSON.parse(spec)));
    item.image = image.substring(2, image.length - 2).split('", "');
    // item.product_specifications = specList;
  }
  // -----------------------------------------------------------

  return data;
};
