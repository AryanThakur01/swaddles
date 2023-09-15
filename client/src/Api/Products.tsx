import axios from "axios";

export const getProductsApi = async (
  search: string,
  page: number | null,
  limit?: number,
  filter?: string | null,
) => {
  filter = filter?.split("-amp-").join(" & ");
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/v1/products/search?search=${
      search || " "
    }&page=${page || 1}&limit=${limit || 20}&filter=${filter}`,
  );
  return data;
};

export const getProductList = async (searchList: string) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BACKEND
    }/api/v1/products/getproductlist?products=${searchList}`,
  );
  return data;
};

export const getSingleProductApi = async (_id: string | null) => {
  let { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/v1/products/oneproduct?_id=${_id}`,
  );
  data = data._doc;
  // ------ Converting Data For The Application ------------
  const image = data.image;
  let categories = data.product_category_tree;
  let specs: string = data.product_specifications;
  data.product_category_tree = categories
    .substring(2, categories.length - 2)
    .split(" >> ");
  specs = specs
    .substring(specs.indexOf("[") + 1, specs.indexOf("]"))
    .replaceAll('"=>"', '":"')
    .replaceAll("}, {", "}-^-{");
  let specList = specs.split("-^-");
  specList.forEach((spec, i) => (specList[i] = JSON.parse(spec)));
  data.image = image.substring(2, image.length - 2).split('", "');
  data.product_specifications = specList;
  // -----------------------------------------------------------

  return { ...data };
};

export const getFilters = async () => {
  const search = new URLSearchParams(location.search).get("search");
  let { data } = await axios.get(
    `${
      import.meta.env.VITE_BACKEND
    }/api/v1/products/getfilters/?search=${search}`,
  );
  // console.log(data);
  return data.filters;
};

export const getMyOrdersApi = async () => {
  const Authorization = "Bearer " + localStorage.getItem("token");
  let { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/v1/products/getMyOrders`,
    { headers: { Authorization } },
  );
  let len = data.myOrders.length;
  let orderList = data.myOrders;
  // ------ Converting Image For The Application ------------
  for (let i = 0; i < len; i++) {
    let Items = orderList[i].Items;
    let itemsLen = orderList[i].Items.length;
    for (let j = 0; j < itemsLen; j++) {
      let order = Items[j].order;
      const image = order.image;
      order.image = image.substring(2, image.length - 2).split('", "');
    }
  }
  // -----------------------------------------------------------
  return data;
};
