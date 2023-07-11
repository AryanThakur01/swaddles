import { FC, useEffect, useState } from "react";
import Footer from "../UI/Footer";
import Navigation from "../UI/Navigation";
import ProductFilters from "../UI/ProductFilters";
import DisplayCard from "../cards/DisplayCard";
import axios from "axios";
import { IProducts } from "../../interfaces/interface";
import LoadingSkeleton from "../UI/LoadingSkeleton";
interface IDisplayProducts {}

const DisplayProducts: FC<IDisplayProducts> = () => {
  const [productList, setProductList] = useState<
    undefined | Array<IProducts>
  >();
  const [loading, setLoading] = useState(false);

  const getSearchedProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    const page = params.get("page");
    if (!search) return;
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_BACKEND
      }/api/v1/products/search?search=${search}&page=${page || 1}&limit=${20}`
    );
    const dataList: Array<IProducts> = [];
    Object.keys(data).map((item) => {
      const image = data[item].image;
      let categories = data[item].product_category_tree;
      data[item].product_category_tree = categories
        .substring(2, categories.length - 2)
        .split(" >> ");
      data[item].image = image.substring(2, image.length - 2).split('", "');
      dataList.push(data[item]);
    });
    // console.log(dataList);
    setProductList([...dataList]);
    setLoading(false);
  };
  useEffect(() => {
    getSearchedProducts();
  }, []);

  return (
    <div>
      <Navigation />
      <ProductFilters>
        {loading ? (
          <>
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
            <LoadingSkeleton />
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {productList?.map((item) => (
              <DisplayCard {...item} key={item._id} />
            ))}
          </div>
        )}
      </ProductFilters>
      <Footer />
    </div>
  );
};

export default DisplayProducts;
