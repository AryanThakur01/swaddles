import { FC, useEffect, useState } from "react";
import Navigation from "../../UI/Navigation";
import { getProductData } from "../../../context/ProductProvider";
import axios from "axios";

interface IProduct {}

const Product: FC<IProduct> = () => {
  const CurrentProduct = getProductData();

  const getProduct = async () => {
    const _id = new URLSearchParams(location.search).get("_id");
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND}/api/v1/products/oneproduct?_id=${_id}`
      );
      if (CurrentProduct?.setProduct) CurrentProduct.setProduct(data[0]);
      console.log(CurrentProduct);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      <Navigation />
      <div className="my-20 w-[80%] m-auto">Product Id:</div>
    </div>
  );
};

export default Product;
