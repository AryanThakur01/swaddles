import { FC, useEffect, useState } from "react";
import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import ProductFilters from "../../UI/ProductFilters";
import DisplayCard from "../../cards/DisplayCard";
import LoadingSkeleton from "../../UI/LoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { getProductData } from "../../../context/ProductProvider";
import { Slide, ToastContainer } from "react-toastify";
interface IDisplayProducts {}

const DisplayProducts: FC<IDisplayProducts> = () => {
  // States
  const [pagesAvailable, setPagesAvailable] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // getting the essentials
  const navigate = useNavigate();
  const products = getProductData();

  // Get the searched products
  const getSearchedProducts = async () => {
    setLoading(true);
    if (products?.getProductList) products.getProductList();
  };
  useEffect(() => {
    setLoading(true);
    products?.pagesAvailable && setPagesAvailable(products?.pagesAvailable);
    setLoading(false);
  }, [products?.productList]);

  // When the page open this use effect will run
  useEffect(() => {
    getSearchedProducts();
  }, []);

  const changePage = (newPage: number) => {
    window.scrollTo(0, 0);
    const url = new URL(location.href);
    url.searchParams.set("page", newPage.toString());
    navigate(url.pathname + url.search);
    setPage(newPage);
    getSearchedProducts();
  };

  const NavigationButton = Array.from(
    { length: pagesAvailable },
    (_, index) => {
      if (
        index + 1 === page ||
        index + 1 === page - 1 ||
        index + 1 === page + 1 ||
        index + 1 === pagesAvailable ||
        index + 1 === 1
      )
        return (
          <button
            className={`p-1 px-3 mx-1 rounded-sm shadow-sm ${
              page === index + 1 ? "bg-primary text-white" : "bg-white "
            }`}
            onClick={() => changePage(index + 1)}
            key={index}
          >
            {index + 1}
          </button>
        );
      else if (index <= page + 10 && index >= page - 10)
        return (
          <button
            key={index}
            className="text-xs"
            onClick={() => changePage(index + 1)}
          >
            .
          </button>
        );
    },
  );

  useEffect(() => {
    const currentPage = new URLSearchParams(location.search).get("page");
    setPage(Number(currentPage || 1));
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
            <ToastContainer transition={Slide} />
            {products?.productList?.map((item) => (
              <DisplayCard {...item} key={item._id} />
            ))}
          </div>
        )}
      </ProductFilters>
      <div className="flex justify-center gap-3 font-bold">
        <button
          className="text-primary bg-white px-3 rounded-full shadow-lg hover:bg-primary hover:text-white"
          onClick={() => page > 1 && changePage(page - 1)}
        >
          PREVIOUS
        </button>
        <div>{NavigationButton}</div>
        <button
          className="text-primary bg-white px-3 rounded-full shadow-lg hover:bg-primary hover:text-white"
          onClick={() => page < pagesAvailable && changePage(page + 1)}
        >
          NEXT
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default DisplayProducts;
