import axios from "axios";

export const getProductsApi = async (
  search: string,
  page: string | null,
  limit?: number
) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_BACKEND
    }/api/v1/products/search?search=${search}&page=${page || 1}&limit=${
      limit || 20
    }`
  );
  return { ...data };
};

export const getSingleProductApi = async (_id: string | null) => {
  let { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND}/api/v1/products/oneproduct?_id=${_id}`
  );
  data = data._doc;
  return { ...data };
};
