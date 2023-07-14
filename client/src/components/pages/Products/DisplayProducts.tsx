import { FC, useEffect, useState } from "react";
import Footer from "../../UI/Footer";
import Navigation from "../../UI/Navigation";
import ProductFilters from "../../UI/ProductFilters";
import DisplayCard from "../../cards/DisplayCard";
import { IProducts } from "../../../interfaces/interface";
import LoadingSkeleton from "../../UI/LoadingSkeleton";
import { getProductsApi } from "../../../Api/Products";
import { useNavigate } from "react-router-dom";
interface IDisplayProducts {}

const DisplayProducts: FC<IDisplayProducts> = () => {
  const [pagesAvailable, setPagesAvailable] = useState<number>(1);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentSearch, setCurrentSearch] = useState<string>("");
  const [productList, setProductList] = useState<
    undefined | Array<IProducts>
  >();

  const navigate = useNavigate();
  const getSearchedProducts = async () => {
    setLoading(true);
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    search && setCurrentSearch(search);
    const page = Number(params.get("page"));
    const limit = 20;

    if (!search) return;

    let data = await getProductsApi(search, page, limit);

    const length = data.length;
    setPagesAvailable(Math.ceil(length / limit));

    data = data.productList;
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

    setProductList([...dataList]);
    setLoading(false);
  };

  const changePage = (newPage: number) => {
    navigate(`/productsDisplay?search=${currentSearch}&page=${newPage}`);
    location.reload();
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
          >
            {index + 1}
          </button>
        );
      return (
        <button
          className={`h-1 w-1 rounded-sm ${
            page === index + 1 ? "bg-primary text-white" : "bg-secondary_white"
          }`}
          onClick={() => changePage(index + 1)}
        ></button>
      );
    }
  );

  useEffect(() => {
    const currentPage = new URLSearchParams(location.search).get("page");
    setPage(Number(currentPage));
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
      <div className="flex justify-center gap-3 font-bold">
        <button
          className="text-primary bg-white px-3 rounded-full shadow-lg hover:bg-primary hover:text-white"
          onClick={() => page > 0 && changePage(page - 1)}
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
