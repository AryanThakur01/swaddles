import { FC, ReactNode, useEffect, useState } from "react";
import { getFilters } from "../../Api/Products";
import { useNavigate } from "react-router-dom";
import { getProductData } from "../../context/ProductProvider";
import { GrFilter } from "react-icons/gr";
import { FaChevronRight } from "react-icons/fa";

interface IProductFilterProps {
  children: ReactNode;
}

const ProductFilters: FC<IProductFilterProps> = ({ children }) => {
  const [filterList, setFilterList] = useState<Array<string>>([]);
  const [activeFilter, setActiveFilter] = useState<string | undefined>("");
  const [showFilters, setShowFilters] = useState(false);

  const filters = async () => {
    const data = await getFilters();
    const tempFilterList = [];
    let filterListLength = tempFilterList.length;
    for (let i = data.length - 1; i >= 0; i--) {
      for (let j = 0; j < data[i].length; j++) {
        if (j + 1 > filterListLength) {
          const s: Set<string> = new Set();
          tempFilterList.push(s);
          filterListLength++;
        }
        tempFilterList[j].add(data[i][j]);
      }
    }
    const url = new URL(location.href);
    tempFilterList[0] = Array.from(tempFilterList[0]);
    setFilterList([...tempFilterList[0]]);
  };
  const navigate = useNavigate();

  const products = getProductData();

  const filterData = (filter: string) => {
    const url = new URL(location.href);
    setActiveFilter(filter);
    filter = filter.split(" & ").join("-amp-");
    url.searchParams.set("filter", filter);
    url.searchParams.set("page", "1");
    navigate(url.pathname + url.search);
    if (products?.getProductList) products.getProductList();
  };

  useEffect(() => {
    const url = new URL(location.href);
    setActiveFilter(url.searchParams.get("filter")?.split("-amp-").join(" & "));
    filters();
  }, [activeFilter]);
  return (
    <div className="flex gap-3 p-2 my-20">
      <div
        className={`w-[25%] absolute md:relative rounded bg-white p-3 ${
          showFilters
            ? "w-full h-full animate-popup top-0 py-16 left-0 absolute"
            : "top-[-800%] animate-popup_close md:animate-none"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-xl">Filters</h1>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`mx-3 ${showFilters ? "" : "hidden"} text-2xl`}
          >
            &times;
          </button>
        </div>
        <hr />
        <div className="flex flex-col gap-3"></div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xs font-bold my-3">
            {activeFilter ? activeFilter.toUpperCase() : "CATEGORIES"}
          </h2>
          {filterList.map((filter) => (
            <button
              className={`text-secondary_dark text-start text-sm mx-2 text-ellipsis overflow-hidden whitespace-nowrap hover:font-bold flex justify-between items-center ${
                activeFilter === filter && "font-bold"
              }`}
              value={filter}
              key={filter}
              onClick={() => filterData(filter)}
            >
              {filter} <FaChevronRight />
            </button>
          ))}
        </div>
      </div>
      <div className="w-full p-3 bg-white shadow-sm min-h-full rounded-sm">
        <div className="bg-primary_white p-3 rounded flex justify-end md:hidden">
          <button
            type="button"
            className="flex items-center gap-3 hover:font-bold"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters <GrFilter />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProductFilters;
